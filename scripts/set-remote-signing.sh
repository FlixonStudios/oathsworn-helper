# run from project root
BUILD_GRADLE_PATH="android/app/build.gradle"

# Read the store and key passwords from GitHub Secrets
STORE_PASSWORD=${{ secrets.STORE_PASSWORD }}
KEY_PASSWORD=${{ secrets.KEY_PASSWORD }}

sed -i "/signingConfigs.*{/a \\
        release {\\
            storeFile file('../../release.keystore')\\
            storePassword '$STORE_PASSWORD'\\
            keyAlias 'release'\\
            keyPassword '$KEY_PASSWORD'\\
        }" $BUILD_GRADLE_PATH


sed -i "/release.*{/,/}/s/signingConfig signingConfigs.debug/signingConfig signingConfigs.release/" $BUILD_GRADLE_PATH