const routes = require('express').Router();
const inputsRoute = require('./inputs');
const overlaysRoute = require('./overlays');
const vmixService = require('../services/vmix');
var inputService = require('../services/inputs');
var overlayService = require('../services/overlays');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

routes.use('/inputs', inputsRoute);
routes.use('/overlays', overlaysRoute);

routes.get('/', async (req, res) => {
    let vmixData = await vmixService();
    let inputs = await inputService.all();
    let overlays = await overlayService.all();

    let inputKeys = inputs.map((input) => {
        return input.key;
    });

    let overlayKeys = overlays.map((overlay) => {
        return overlay.number;
    });

    let response = {
        version: lodashGet(vmixData, 'version[0]._text[0]'),
        edition: lodashGet(vmixData, 'edition[0]._text[0]'),
        inputs: inputKeys,
        overlays: overlayKeys,
        preview: lodashGet(vmixData, 'preview[0]._text[0]'),
        active: lodashGet(vmixData, 'active[0]._text[0]'),
        fadeToBlack: boolean(lodashGet(vmixData, 'version[0]._text[0]')),
        recording: boolean(lodashGet(vmixData, 'recording[0]._text[0]')),
        external: boolean(lodashGet(vmixData, 'external[0]._text[0]')),
        streaming: boolean(lodashGet(vmixData, 'streaming[0]._text[0]')),
        playList: boolean(lodashGet(vmixData, 'playList[0]._text[0]')),
        multiCorder: boolean(lodashGet(vmixData, 'multiCorder[0]._text[0]')),
        fullscreen: boolean(lodashGet(vmixData, 'fullscreen[0]._text[0]')),
    };
    res.json(response); 
});

module.exports = routes;
