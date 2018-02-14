const routes = require('express').Router();
const inputsRoute = require('./inputs');
const overlaysRoute = require('./overlays');
const transitionsRoute = require('./transitions');
const statusRoute = require('./status');
const vmixRoute = require('./vmix');

const vmixService = require('../services/vmix');
const inputService = require('../services/inputs');
const overlayService = require('../services/overlays');
const transitionService = require('../services/transitions');

routes.use('/inputs', inputsRoute);
routes.use('/overlays', overlaysRoute);
routes.use('/transitions', transitionsRoute);
routes.use('/status', statusRoute);
routes.use('/vmix', vmixRoute);

module.exports = routes;
