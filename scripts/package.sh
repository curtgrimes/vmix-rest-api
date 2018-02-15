#!/bin/bash
VERSION=`npm run -s version`
EXE_FILENAME="vmix-rest-api-$(echo $VERSION).exe"
mkdir .tmp
rm -f vmix-rest-api.zip # if it already exists
pkg --targets latest-win-x64 --output .tmp/$(echo $EXE_FILENAME) app/index.js
cp config/config.sample.yml .tmp
mv .tmp/config.sample.yml .tmp/config.yml
zip -j vmix-rest-api.zip .tmp/$(echo $EXE_FILENAME) .tmp/config.yml
rm -rf .tmp