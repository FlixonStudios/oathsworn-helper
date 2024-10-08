# Learning points

## What does this project wish to achieve

An end-to-end CI/CD project for a RN Expo application without backend.

### Issues encountered

#### Installing Ruby

- Ubuntu does not have the latest ruby available. So use provided curl commands.

- Faced issue not using rnbenv after install

can try running this:
```
rbenv rehash
```
Reference: https://github.com/rbenv/rbenv?tab=readme-ov-file#rbenv-rehash

Verify ruby being used is the correct one:
```
rbenv versions
```

should show \*3.1.6 should not be tagged to system

Helpful commands:
```
ruby -v
```

#### Installing bundler

Faced with permission errors with the following thus sudo:
```
sudo gem install bundler

sudo bundle update
```

Needed `sudo apt-get install ruby-dev` since faced this error:
```
mkmf.rb can't find header files for ruby at /usr/lib/ruby/include/ruby.h
```

Permissions errors were solved by running:

```
sudo chown -R $USER:$USER /home/<USER>/.../oathsworn-helper
```

This was probably due to me running trying to write the files in WSL2 Ubuntu.
Original permissions to the folder were limited to `root`

#### Installing Android Studio

On Ubuntu WSL2, after installing Android Studio, when running:
```
npx expo run:android 
```
Will be faced with:
```
Error: spawn /mnt/f/Utilities/Android/Sdk/platform-tools/adb ENOENT
```
This was fixed by searching for instances of:
```
.../platform-tools/adb 
```
and replacing it to:
```
.../platform-tools/adb.exe 
```


#### Running Fastlane

---

During `upload_to_play_store`:

`[!] Google Api Error: Invalid request - The caller does not have permission`

Need to add the service-account email to Users and Permissions in Google Play Landing page.
See `Get google-services.json` section

---

During `fastlane supply init`:

`[!] undefined method `size' for nil:NilClass (NoMethodError)`

because you are trying to upload to a track that does not even have 1 bundle uploaded.

---

`[!] Could not find release for version code '3' to update changelog`

This occurs when you do not include `skip_upload_changelogs: true` in upload_to_play_store
Because Fastlane expects to find an existing release with that versionCode to update the changelog.

---

`[!] Google Api Error: Invalid request - Only releases with status draft may be created on draft app.`

You need to at least have your app pushed to Closed Testing before you can call upload_to_play_store

---

Inside the script (./set-local-signing.sh), we expect local secrets to be in the \<project-root\>/.env:

We have to use `./.env` instead of `.env`

Relative Paths in Shell Scripts:

When you use .env without any prefix, the shell looks for .env in the directories listed in the PATH environment variable, which doesn't include the current directory by default.
./.env specifically tells the shell to look for a file named .env in the current working directory

---

[!] Google Api Error: Invalid request - UploadException: TOS_NOT_ACCEPTED

You need to accept the TOS:
\<Select app\> -> Setup -> Internal app signing
There should be something to accept on the page.

---

### Running deployment to Google Play Console

You need to have the native android folder before we can run the fastlane lane.

Local deployment via fastlane:

```
# clean previous folder
rm -rf android

npx expo prebuild --platform android

# copy fastlane folder to the android project folder
cp -r fastlane android

# inject secrets to release configs in generated build.gradle file
sh ./scripts/set-local-signing.sh


cd android

# run init to get metadata
bundle exec fastlane supply init

# execute upload to internal testing track
bundle exec fastlane android upload

cd ..

```

Explanation:

Note that the `version name` of the aab is managed in this project via that app.json. The `version code` is dynamically retrieved from the Google Play Console via the upload lane in Fastfile.

If we always want to keep the repo small, and do not want to modify native files, we can destroy the android folder and rerun the build generation in the pipeline to get the apk file.

Because `fastlane` defaults to be in the `android` folder, but we need to regenerate the folder at build time due to versioning, we can have the `fastlane` folder in another directory (e.g. `<project-root>`) and copy it over just before we run the `fastlane`.


#### If you want to generate the apk

The generated apk after running `npx expo run:android --variant release` or

```
gradle(
    task: "assemble",
    build_type: "Release",
)
```

apk path: `<project-root>/android/app/build/outputs/apk/release/app-release.apk`


## Setting up Google Services

### Initial upload

You need to manually upload the first aab before you can run the upload_to_play_store fastlane action

You need to promote this first bundle from Internal to Closed
- Internal > Closed > Open > Production

### Signing

```
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

You need to sign the aab/apk with a release keystore file
- You'll get a `release.keystore` file
- You can place it at the project root 
- You need this for signing in the android/app/build.gradle

### Get google-services.json

You need to bump versionCode for each aab upload to the release

1. Create Project
2. Create Service Account
3. Add Permissions
    - Grant Access
    - Editor (to allow releases)
4. Add Key
    - JSON > download (this is the google-services.json)

You need this is the project route (the expected default path that fastlane)

### Internal testing

You need 'check' the checkbox beside the email lists of testers, otherwise they will see 404.
As the tester, you need to enable Internal app sharing in Google Play settings

