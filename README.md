# vMix REST API

This is a REST API that developers can use to interact with the <a href="https://www.vmix.com/" target="_blank">vMix Live Production & Streaming Software</a>. It supplements and runs alongside vMix's <a href="https://www.vmix.com/help17/index.htm?DeveloperAPI.html">built-in XML-based API</a>.

# Table of Contents
* [Features](#features)
* [Installation](#installation)
* [Full API Documentation](#full-api-documentation)
* [Examples](#examples)
  * [Get a list of all inputs](#get-a-list-of-all-inputs)
  * [Get a single input](#get-a-single-input)
  * [Make input 1 active with a wipe transition effect](#make-input-1-active-with-a-wipe-transition-effect)
  * [Get vMix version information](#get-vmix-version-information)
* [Development](#development)

## Features
* Standalone [Windows executable](https://github.com/curtgrimes/vmix-rest-api/releases/latest) that exposes the REST API on a port on localhost
* [Well-documented API](https://curtgrimes.github.io/vmix-rest-api) that makes it easy to get inputs, overlays, transitions, and make actions
* Built-in remote access to the REST API with access token authentication

## Installation
1. Run [vMix](https://www.vmix.com) and [enable the Web Controller](https://www.vmix.com/knowledgebase/article.aspx/69/how-to-control-vmix-from-a-web-browser-using-vmix-web-controller).
1. Download the [latest Windows release](https://github.com/curtgrimes/vmix-rest-api/releases/latest)
1. (TODO) Update the config file with the Web Controller URL
1. Run the vMix REST API. If all goes well, it'll give you the new base URI to make requests against.


## Full API Documentation
Read the [full API documentation](https://curtgrimes.github.io/vmix-rest-api/) to see what the vMix REST API can do.

## Examples
Note that in these examples, *http://localhost:3000* should be the base URI given to you when you start the vMix REST API.

### Get a list of all inputs
**`GET /inputs`**
```
curl -i -H 'Accept: application/json' http://localhost:3000/inputs
```
Returns:
```json
[
  {
    "inputId": 1,
    "type": "Xaml",
    "title": "NewsHD2.xaml",
    "state": "Paused",
    "position": 0,
    "duration": 0,
    "loop": false,
    "isActive": false,
    "isPreview": false
  },
  {
    "inputId": 2,
    "type": "Xaml",
    "title": "TimerClock.xaml",
    "state": "Paused",
    "position": 0,
    "duration": 0,
    "loop": false,
    "isActive": false,
    "isPreview": true
  }
]
```

### Get a single input
**`GET /inputs/2`**
```
curl -i -H 'Accept: application/json' http://localhost:3000/inputs/2
```
Returns:
```json
{
  "inputId": 2,
  "type": "Xaml",
  "title": "TimerClock.xaml",
  "state": "Paused",
  "position": 0,
  "duration": 0,
  "loop": false,
  "isActive": false,
  "isPreview": true
}
```

### Make input 1 active with a wipe transition effect
**`PUT /inputs/1?isActive=true&transitionEffect=wipe`**
```
curl -i -H 'Accept: application/json' -X PUT http://localhost:3000/inputs/1?isActive=true&transitionEffect=wipe
```
Returns 200 on success.

### Get vMix version information
**`GET /vmix**
```
curl -i -H 'Accept: application/json' http://localhost:3000/vmix
```
Returns:
```json
{
  "version": "19.0.0.54",
  "edition": "Basic HD"
}
```


## Development
### Docker
1. Build: `docker build . -t vmix-rest-api`
1. Set environment variable `VMIX_PATH` to something like `http://10.211.55.6:8088/api`
1. Run locally on port 3000: `docker run -it -p 3000:3000 -d vmix-rest-api`
1. Go to http://localhost:3000

### Nodemon
1. Run `VMIX_PATH=http://path/to/vmix/api nodemon app/index.js`