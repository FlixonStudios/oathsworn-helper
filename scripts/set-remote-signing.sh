# run from project root
BUILD_GRADLE_PATH="android/app/build.gradle"

# base64 values (GitHub Secrets) should be injected to env via pipeline
echo $GOOGLE_SERVICES_JSON_BASE64 | base64 --decode > ./google-services.json
echo $RELEASE_KEYSTORE_BASE64 | base64 --decode > ./release.keystore

# store and key passwords (GitHub Secrets) should be injected to env via pipeline
sed -i "/signingConfigs.*{/a \\
        release {\\
            storeFile file('../../release.keystore')\\
            storePassword '$STORE_PASSWORD'\\
            keyAlias 'release'\\
            keyPassword '$KEY_PASSWORD'\\
        }" $BUILD_GRADLE_PATH


sed -i "/release.*{/,/}/s/signingConfig signingConfigs.debug/signingConfig signingConfigs.release/" $BUILD_GRADLE_PATH