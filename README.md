<h1 align="center">vMix REST API</h1>
<p align="center">
  <img src="/docs/screenshot.png?raw=true" alt="vMix REST API" width="500">
</p>
<p align="center">
  A REST API for <a href="https://www.vmix.com/" target="_blank">vMix Live Video Streaming</a>.
</p>

## Features
* [Well-documented API](https://curtgrimes.github.io/vmix-rest-api) for vMix that's built with REST principles in mind.
* **Remote access** to the REST API and vMix's native Web Controller.
* Easily **get inputs, overlays, transitions, and send actions** to a running vMix instance.
* **Standalone [Windows executable](https://github.com/curtgrimes/vmix-rest-api/releases/latest)** that exposes the REST API.
* Runs alongside vMix's existing XML-based API.

<p align="center">
  <img src="/docs/vmix-web-api-features.png?raw=true" alt="vMix REST API Features" width="700">
</p>

## Installation
1. Run [vMix](https://www.vmix.com) and [enable the Web Controller](https://www.vmix.com/knowledgebase/article.aspx/69/how-to-control-vmix-from-a-web-browser-using-vmix-web-controller).
1. Download the [latest Windows release](https://github.com/curtgrimes/vmix-rest-api/releases/latest)
1. Open the config.yml file in a text editor and update it with your Web Controller URL.
1. Run the vMix REST API and start making requests. Check out the [examples](#examples) to get started. 🤖

## Full API Documentation
Read the [full API documentation](https://curtgrimes.github.io/vmix-rest-api/) to see what the vMix REST API can do.

## Examples
In these examples, replace *http://localhost:3000/api/rest/v1* with your own base URL given when you start the vMix REST API.

### Get a list of all inputs
**`GET /inputs`**
```
curl -i -H 'Accept: application/json' http://localhost:3000/api/rest/v1/inputs
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
curl -i -H 'Accept: application/json' http://localhost:3000/api/rest/v1/inputs/2
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
curl -i -H 'Accept: application/json' -X PUT http://localhost:3000/api/rest/v1/inputs/1?isActive=true&transitionEffect=wipe
```
Returns 200 on success.

### Get vMix version information
**`GET /vmix**
```
curl -i -H 'Accept: application/json' http://localhost:3000/api/rest/v1/vmix
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
1. Go to http://localhost:3000/api/rest/v1 and start making requests (like http://localhost:3000/api/rest/v1/inputs)

### Nodemon
1. Run `CONFIG_PATH=http://path/to/vmix/api nodemon app/index.js`