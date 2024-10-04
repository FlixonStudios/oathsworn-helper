# this script is for encoding secrets for upload to github secrets
# run from project root

# For a .json file (replace <file> with the path to your file):
base64 -w 0 google-services.json > google-services.json.base64

# For a .keystore file:
base64 -w 0 release.keystore > release.keystore.base64