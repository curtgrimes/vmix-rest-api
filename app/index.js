var express = require('express');
var app = express();
const routes = require('./routes');

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