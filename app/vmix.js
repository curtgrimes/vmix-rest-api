const request = require('request');
const xml2js = require('xml-js').xml2js;
const lodashGet = require('lodash/get');

function stringEndsWithAPIPath(string) {
    let matches = string.match(".*\/api$");
    return matches !== null && matches.length > 0;
}

module.exports = (callback) => {
    let vmixPath = process.env.VMIX_PATH + (!stringEndsWithAPIPath(process.env.VMIX_PATH) ? '/api' : '');
    
    request(vmixPath, function (error, response, xml) {
        let vmixAPIObject = xml2js(xml, {
            compact: true,
            alwaysArray: true,
        });
        
        callback(lodashGet(vmixAPIObject, 'vmix[0]'));
    });    
};
