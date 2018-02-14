const inputs = require('express').Router();
const all = require('./all');
const singleGet = require('./singleGet');
const singlePut = require('./singlePut');
const active = require('./active');
const preview = require('./preview');

inputs.get('/', all);
inputs.get('/:inputId([0-9]*)', singleGet);
inputs.put('/:inputId([0-9]*)', singlePut);
inputs.get('/active', active);
inputs.get('/preview', preview);

module.exports = inputs;