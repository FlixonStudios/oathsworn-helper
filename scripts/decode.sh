# to be ran after encode.sh, appends -test to avoid replacing actual secret

cat google-services.json.base64 | base64 --decode > ./google-services-test.json

cat release.keystore.base64 | base64 --decode > ./release-test.keystore