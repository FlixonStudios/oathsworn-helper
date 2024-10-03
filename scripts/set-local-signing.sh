BUILD_GRADLE_PATH="android/app/build.gradle"

# needed to add the ./ in front of the .env 
# only for local development, we need to have an .env file that looks like this:
. ./.env

sed -i "/signingConfigs.*{/a \\
        release {\\
            storeFile file('../../release.keystore')\\
            storePassword '$STORE_PASSWORD'\\
            keyAlias 'release'\\
            keyPassword '$KEY_PASSWORD'\\
        }" $BUILD_GRADLE_PATH


sed -i "/release.*{/,/}/s/signingConfig signingConfigs.debug/signingConfig signingConfigs.release/" $BUILD_GRADLE_PATH

# MORE INFO:

# "/signingConfigs.*{/a \\
# Searches for the line that contains signingConfigs {
# a \\ appends the text after the matched line
#
# storeFile points to the keystore path
# keyAlias is the alias specified during key generation
#
#