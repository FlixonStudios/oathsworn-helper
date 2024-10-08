# Installation Guide

## Prerequisites

Required:
- Node
- Android Studio

Optional:
- Ruby
- Fastlane
- Google Developer Account

### Node + Expo 

This project is made using Ubuntu on WSL 2.

Install NodeJS

- follow install steps on nvm:
(https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

(Optional) Install serve to run built web page
```
npm install -g serve
```

### Android Studio

You will need to have Android Studio installed in your machine to run in Android.

As we are building the project using Expo in NodeJS within Ubuntu WSL2, you'll need to follow the instructions on https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build&buildEnv=local.


### (Optional) Ruby

Install Ruby via `rbenv`:

```
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
```

Verify `rnenv` installation:

```
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-doctor | bash
```

Install ruby (3.1.6 was used for this project):

```
rbenv install 3.1.6
```

Set ruby to global (optional):

```
rbenv global 3.1.6
```

Reference: https://github.com/rbenv/rbenv

### (Optional) Fastlane


#### Install Bundler

Note that you have to install Ruby first.

```
gem install bundler
```

Create a ./Gemfile in the root directory of your project with the content

```
source "https://rubygems.org"
gem "fastlane"
```

Reference: https://docs.fastlane.tools/getting-started/android/setup/

#### Setup

Note that we are planning to rebuild the android project folder on every release so as to reduce the size of the repository and ensure we do not need to maintain native code.

At this point no other command is required as the Fastfile and Appfile is already present in the directory (./fastlane).

These should be in ./android but as stated above we do not wish to maintain an android folder in the repo.


Reference: https://docs.fastlane.tools/getting-started/android/setup/
