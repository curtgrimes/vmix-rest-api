const transitions = require('express').Router();
const all = require('./all');
const single = require('./single');

transitions.get('/', all);
transitions.get('/:transitionId', single);

module.exports = transitions;