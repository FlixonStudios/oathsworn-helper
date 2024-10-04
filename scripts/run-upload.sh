
cd android

# run init to get metadata
bundle exec fastlane supply init
# execute upload to internal testing track
bundle exec fastlane android upload

cd ..

# cleanup
rm -rf android