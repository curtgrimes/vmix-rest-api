const vmix = require('express').Router();
const vmixService = require('../../services/vmix').getData;
const lodashGet = require('lodash/get');
const boolean = require('boolean');

vmix.get('/', async (req, res) => {
    try {
        let vmixData = await vmixService();
    }
    catch (error) {
        next(error);
        return;
    }

    res.json({
        version: lodashGet(vmixData, 'version[0]._text[0]'),
        edition: lodashGet(vmixData, 'edition[0]._text[0]'),
    });
});

module.exports = vmix;