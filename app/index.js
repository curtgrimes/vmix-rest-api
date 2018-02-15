if (!process.env.VMIX_PATH) {
    process.env.VMIX_PATH = 'http://localhost:8080';
}

var express = require('express');
var app = express();
const routes = require('./routes');

console.log('Unofficial vMix REST API');
console.log('In vMix, turn on Web Controller and set the port to 8080.');
console.log('If everything works, visit http://localhost:3000 in a browser on this computer.');

app.use(function (req, res, next) {
    if (!process.env.VMIX_PATH) {
        res
            .status('501')
            .send('VMIX_PATH environment variable is not set.');
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

app.listen(3000);