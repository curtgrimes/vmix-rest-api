// Load config first
const config = require('./config').load();

if (!config) {
    // Config not loaded. Splash screen will show
    // an error message.
    require('./splashScreen')();
    return;
}

var express = require('express');
var app = express();
const routes = require('./routes');
let vmix = require('./services/vmix');
var bodyParser = require('body-parser')

if (config.vmix_rest_api.remote_access.enabled) {
    require('./remoteAccess').connect();
}

app.use(bodyParser.json());
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

app.get('/', async (req, res) => {
    let mainPageContent = await require('./mainPage')();
    res.send(mainPageContent);
});

if (config.vmix_rest_api.remote_access.remote_web_controller) {
    // Enable proxy to Web Controller
    app.get(['/web-controller', '/web-controller*'], vmix.getProxyToWebController());
}

app.use('/api/rest/v1', routes);

// Error handling
// Put this last
app.use(function (error, req, res, next) {
    console.error(error.message);
    res.status(500).send(error.message);
});

app.listen(config.vmix_rest_api.port);

require('./splashScreen')();
