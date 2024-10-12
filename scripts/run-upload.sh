
cd android

# run init to get metadata
bundle exec fastlane supply init

echo "Starting upload to playstore"
# execute upload to internal testing track
bundle exec fastlane android upload

cd ..

# cleanup
rm -rf android