const inputs = require('express').Router();
const all = require('./all');
const singleGet = require('./singleGet');
const singlePut = require('./singlePut');
const active = require('./active');
const preview = require('./preview');
const fields = require('./fields');

inputs.get('/', all);
inputs.use('/:inputId([0-9]+)/fields', fields);
inputs.get('/:inputId([0-9]+)', singleGet);
inputs.put('/:inputId([0-9]+)', singlePut);

inputs.get('/active', active);
inputs.get('/preview', preview);

module.exports = inputs;