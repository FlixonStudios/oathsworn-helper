#!/bin/bash

# Path to app.json, run in project root
APP_JSON_PATH="./app.json"

# script to update versionCode and versionName in build.gradle
BUILD_GRADLE_PATH="android/app/build.gradle"

# version code should be via git tag
VERSION_CODE=$(jq -r '.expo.android.versionCode' $APP_JSON_PATH)
VERSION_NAME=$(jq -r '.expo.version' $APP_JSON_PATH)

# VERSION_CODE=$(grep -oP 'versionCode \K\d+' $BUILD_GRADLE_PATH)
NEW_VERSION_CODE=$((VERSION_CODE + 1))
# VERSION_NAME="1.0.$NEW_VERSION_CODE"

# Update the versionCode in build.gradle
sed -i "s/versionCode $VERSION_CODE/versionCode $NEW_VERSION_CODE/" $BUILD_GRADLE_PATH

# Update the versionName
sed -i "s/versionName \".*\"/versionName \"$VERSION_NAME\"/" $BUILD_GRADLE_PATH

echo "Updated versionCode to $NEW_VERSION_CODE and versionName to $VERSION_NAME"

# Update versionCode in app.json using jq
jq ".expo.android.versionCode = $NEW_VERSION_CODE" $APP_JSON_PATH > tmp.$$.json && mv tmp.$$.json $APP_JSON_PATH

echo "Updating app.json to $NEW_VERSION_CODE, remember to commit the change"