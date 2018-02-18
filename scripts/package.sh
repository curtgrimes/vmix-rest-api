#!/bin/bash
VERSION=`npm run -s version`
EXE_FILENAME="vmix-rest-api-$(echo $VERSION).exe"
mkdir .tmp .tmp/lib
rm -f vmix-rest-api.zip # if it already exists

pkg --targets latest-win-x64 --output .tmp/$(echo $EXE_FILENAME) app/index.js
cp config/config.sample.yml .tmp
mv .tmp/config.sample.yml .tmp/config.yml

curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip > .tmp/ngrok.zip

unzip .tmp/ngrok.zip -d .tmp/
ls .tmp
rm .tmp/ngrok.zip
mv .tmp/ngrok.exe .tmp/lib/ngrok.exe

cd .tmp
zip -r vmix-rest-api-$(echo $VERSION)-windows.zip .
mv vmix-rest-api-$(echo $VERSION)-windows.zip ..
cd ..
rm -rf .tmp