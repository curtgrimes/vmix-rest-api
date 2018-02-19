const inputs = require('express').Router();
const all = require('./all');
const single = require('./single');

inputs.get('/', all);
inputs.get('/:inputId', single);

module.exports = inputs;