const request = require('request-promise');
const xml2js = require('xml-js').xml2js;
const lodashGet = require('lodash/get');

if (!process.env.VMIX_PATH) {
    process.env.VMIX_PATH = 'http://localhost:8080';
}

const vmixPath = process.env.VMIX_PATH + (!stringEndsWithAPIPath(process.env.VMIX_PATH) ? '/api' : '');

function stringEndsWithAPIPath(string) {
    let matches = string.match(".*\/api$");
    return matches !== null && matches.length > 0;
}

const getData = () => {
    return new Promise((resolve, reject) => {
        request(vmixPath, function (error, response, xml) {
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

module.exports = {
    getData: getData,
    execute: execute,
}