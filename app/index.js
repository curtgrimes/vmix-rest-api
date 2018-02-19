var express = require('express');
var app = express();
const routes = require('./routes');

console.log('Unofficial vMix REST API');
console.log('In vMix, turn on Web Controller and set the port to 8080.');
console.log('If everything works, visit http://localhost:3000 in a browser on this computer.');
if (!process.env.VMIX_PATH) {
    process.env.VMIX_PATH = 'http://localhost:8080';
}

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
 
app.listen(3000);