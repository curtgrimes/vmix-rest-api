// Load config first
const config = require('./config').load();

var express = require('express');
var app = express();
const routes = require('./routes');

console.log('Unofficial vMix REST API');
console.log('In vMix, turn on Web Controller and set the port to 8080.');
console.log('If everything works, visit http://localhost:'+ config.vmix_rest_api.port +' in a browser on this computer.');

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

app.use('/', routes);

// Error handling
// Put this last
app.use(function (error, req, res, next) {
    console.error(error.message);
    res.status(500).send(error.message);
});

app.listen(config.vmix_rest_api.port);