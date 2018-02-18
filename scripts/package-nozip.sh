#!/bin/bash
VERSION=`npm run -s version`
EXE_FILENAME="vmix-rest-api-$(echo $VERSION).exe"
pkg --debug --targets latest-win-x64 --output $(echo $EXE_FILENAME) app/index.js