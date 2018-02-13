const overlays = require('express').Router();
const all = require('./all');
const single = require('./single');

overlays.get('/', all);
overlays.get('/:overlayId', single);

module.exports = overlays;