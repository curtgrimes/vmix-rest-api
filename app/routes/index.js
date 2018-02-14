const routes = require('express').Router();
const inputsRoute = require('./inputs');
const overlaysRoute = require('./overlays');
const transitionsRoute = require('./transitions');
const statusRoute = require('./status');
const vmixRoute = require('./vmix');

routes.use('/inputs', inputsRoute);
routes.use('/overlays', overlaysRoute);
routes.use('/transitions', transitionsRoute);
routes.use('/status', statusRoute);
routes.use('/vmix', vmixRoute);

module.exports = routes;
