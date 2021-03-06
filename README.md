<h1 align="center">vMix REST API</h1>
<p align="center">
  <img src="/docs/screenshot.png?raw=true" alt="vMix REST API" width="650">
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

## Installation
1. Download the [latest Windows release](https://github.com/curtgrimes/vmix-rest-api/releases/latest)
1. Run [vMix](https://www.vmix.com) and [enable the Web Controller](https://www.vmix.com/knowledgebase/article.aspx/69/how-to-control-vmix-from-a-web-browser-using-vmix-web-controller).
1. Open the included [config.yml](config/config.sample.yml) file in a text editor and update it with your Web Controller URL. Optionally enable settings for remote API access and remote Web Controller access.
1. Run the vMix REST API and you'll be given the local base URL to your REST API (and also remote access URLs if you enabled remote access). Check out the [examples](#examples) to get started or read the [full API documentation](https://curtgrimes.github.io/vmix-rest-api/).

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
    "type": "ImageSequence",
    "title": "MVC-001F.JPG",
    "state": {
      "running": false,
      "paused": false,
      "completed": true
    },
    "isActive": false,
    "isPreview": true,
    "media": {
      "position": 0,
      "duration": 0,
      "loop": false,
      "muted": null,
      "volume": null,
      "balance": null,
      "solo": null,
      "audiobusses": null,
      "audioMeter": {
        "left": null,
        "right": null
      }
    },
    "list": null,
    "fields": []
  },
  {
    "inputId": 2,
    "type": "VirtualSet",
    "title": "CircularStudio",
    "state": {
      "running": false,
      "paused": true,
      "completed": false
    },
    "isActive": false,
    "isPreview": false,
    "media": {
      "position": 0,
      "duration": 0,
      "loop": false,
      "muted": null,
      "volume": null,
      "balance": null,
      "solo": null,
      "audiobusses": null,
      "audioMeter": {
        "left": null,
        "right": null
      }
    },
    "list": null,
    "fields": []
  }
]
```

### Get a single input
**`GET /inputs/4`**
```
curl -i -H 'Accept: application/json' http://localhost:3000/api/rest/v1/inputs/4
```
Returns:
```json
{
  "inputId": 4,
  "type": "Xaml",
  "title": "NewsHD.xaml",
  "state": {
    "running": false,
    "paused": true,
    "completed": false
  },
  "isActive": true,
  "isPreview": false,
  "media": {
    "position": 0,
    "duration": 0,
    "loop": false,
    "muted": null,
    "volume": null,
    "balance": null,
    "solo": null,
    "audiobusses": null,
    "audioMeter": {
      "left": null,
      "right": null
    }
  },
  "list": null,
  "fields": [
    {
      "fieldId": "Headline",
      "type": "text",
      "text": "News Brief"
    },
    {
      "fieldId": "Description",
      "type": "text",
      "text": "January 1, 2020"
    }
  ]
}
```

### Make input 1 active with a wipe transition effect
**`PUT /inputs/1`**

Request body

```json
{
  "isActive": true,
  "transitionEffect": "wipe"
}
```
```
curl -i -H 'Accept: application/json' -X PUT -d '{"isActive": true,"transitionEffect": "wipe"}' http://localhost:3000/api/rest/v1/inputs/1
```
Returns 200 on success.

### Update the title called "Headline" on input 4
**`PUT /inputs/4/fields/Headline`**

Request body
```json
{
  "text": "Breaking News"
}
```
```
curl -i -H 'Accept: application/json' -X PUT -d '{"text": "Breaking News"}' http://localhost:3000/api/rest/v1/inputs/4/fields/Headline
```
Returns 200 on success.

### Get vMix version information
**`GET /vmix`**
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
1. Set environment variable `CONFIG_PATH` to something like `/path/to/config`
1. Run locally on port 3000: `docker run -it -p 3000:3000 -d vmix-rest-api`
1. Go to http://localhost:3000/api/rest/v1 and start making requests (like http://localhost:3000/api/rest/v1/inputs)

### Nodemon
1. Run `CONFIG_PATH=/path/to/config.yml nodemon app/index.js`