// Load config first
const config = require('./config').load();
require('./splashScreen')();

if (!config) {
    // Config not loaded. Splash screen will show
    // an error message.
    return;
}

var express = require('express');
var app = express();
const routes = require('./routes');

app.use(function (req, res, next) {
    if (!config.vmix_rest_api.vmix_path) {
        res
            .status('501')
            .send('vmix_Path is not set in config.');
    }
    else {
        next();
    }
});

app.use('/api/rest/v1', routes);

// Error handling
// Put this last
app.use(function (error, req, res, next) {
    console.error(error.message);
    res.status(500).send(error.message);
});

app.listen(config.vmix_rest_api.port);