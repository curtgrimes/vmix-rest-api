const request = require('request-promise');
const xml2js = require('xml-js').xml2js;
const lodashGet = require('lodash/get');
const config = require('../config').load();
var proxy = require('express-http-proxy');

const vmixPath = config.vmix_rest_api.vmix_path + (!stringEndsWithAPIPath(config.vmix_rest_api.vmix_path) ? '/api' : '');
const vmixLoadTimeout = 4000;

function stringEndsWithAPIPath(string) {
    let matches = string.match(".*\/api$");
    return matches !== null && matches.length > 0;
}

const getData = () => {
    return new Promise((resolve, reject) => {
        request(vmixPath, {timeout: vmixLoadTimeout}, (error, response, xml) => {
            if (error || !xml) {
                return;
            }

            let vmixAPIObject = xml2js(xml, {
                compact: true,
                alwaysArray: true,
            });

            resolve(lodashGet(vmixAPIObject, 'vmix[0]'));
        })
        .catch((error) => {
            reject('Unable to connect to vMix at ' + vmixPath);
        });
    })
    .catch((error) => {
        throw new Error(error);
    });
};

const execute = (functionName, inputId, value) => {
    // Execute what vMix calls a function
    const path = vmixPath + 
                '?Function=' + encodeURIComponent(functionName) +
                '&Input=' + encodeURIComponent(inputId) +
                '&Value=' + encodeURIComponent(value);

    return new Promise((resolve) => {
        request(path, function (error, response, xml) {
            if (response.statusCode === 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
    });
};

let connected = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let vmixData = await getData();
            resolve(true);
        }
        catch (error) {
            resolve(false);
        }
    })
};

let proxyToWebController = proxy(vmixPath.replace('/api',''), {
    proxyReqPathResolver: function(req) {
        return req.url.replace('/web-controller','');
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        if (proxyRes.headers['content-type'].includes('image')) {
            // Don't mess with the incoming image; pass it through as is
            return proxyResData;
        }
        else {
            // Replace some paths to things
            return proxyResData.toString('utf8')
                    .replace(/href="\//g,'href="/web-controller/')
                    .replace(/src="\//g,'src="/web-controller/')
                    .replace(/url\('\//g, 'url(\'/web-controller/')
                    .replace(/\/controllerupdate/g, '/web-controller/controllerupdate')
                    .replace(/\/api/g, '/web-controller/api')
                    .replace(/\/tallyupdate/g, '/web-controller/tallyupdate');
        }
    }
});

module.exports = {
    getData,
    execute,
    connected,
    vmixLoadTimeout,
    proxyToWebController,
}