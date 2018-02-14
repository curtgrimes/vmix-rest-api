const inputs = require('express').Router();
const all = require('./all');
const single = require('./single');
const active = require('./active');
const preview = require('./preview');

inputs.get('/', all);
inputs.get('/:inputId([0-9]*)', single);
inputs.get('/active', active);
inputs.get('/preview', preview);

module.exports = inputs;