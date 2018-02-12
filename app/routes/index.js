const routes = require('express').Router();
const inputs = require('./inputs');
const getVmixData = require('../vmix');
const getInputs = require('../models/inputs');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

routes.use('/inputs', inputs);

routes.get('/', (req, res) => {
    getVmixData((vmixData) => {
        getInputs((inputs) => {
            inputs = inputs.map((input) => {
                return lodashGet(input, '_attributes.key');
            });

            let response = {
                version: lodashGet(vmixData, 'version[0]._text[0]'),
                edition: lodashGet(vmixData, 'edition[0]._text[0]'),
                inputs: inputs,
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
    });
});

module.exports = routes;
