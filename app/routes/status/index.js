const status = require('express').Router();
const vmixService = require('../../services/vmix').getData;
const lodashGet = require('lodash/get');
const boolean = require('boolean');

status.get('/', async (req, res) => {
    let vmixData = await vmixService();

    res.json({
        fadeToBlack: boolean(lodashGet(vmixData, 'version[0]._text[0]')),
        recording: boolean(lodashGet(vmixData, 'recording[0]._text[0]')),
        external: boolean(lodashGet(vmixData, 'external[0]._text[0]')),
        streaming: boolean(lodashGet(vmixData, 'streaming[0]._text[0]')),
        playlistActive: boolean(lodashGet(vmixData, 'playList[0]._text[0]')),
        multiCorder: boolean(lodashGet(vmixData, 'multiCorder[0]._text[0]')),
        fullscreen: boolean(lodashGet(vmixData, 'fullscreen[0]._text[0]')),
    });
});

module.exports = status;