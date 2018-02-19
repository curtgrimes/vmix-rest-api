const fields = require('express').Router({mergeParams: true});
const allForInput = require('./allForInput');
const singleGet = require('./singleGet');
const singlePut = require('./singlePut');

fields.get('/', allForInput);
fields.get('/:fieldId', singleGet);
fields.put('/:fieldId', singlePut);

module.exports = fields;