const vmix = require('express').Router();
const vmixService = require('../../services/vmix');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

vmix.get('/', async (req, res) => {
    let vmixData = await vmixService();

    res.json({
        version: lodashGet(vmixData, 'version[0]._text[0]'),
        edition: lodashGet(vmixData, 'edition[0]._text[0]'),
    });
});

module.exports = vmix;