const request = require('request');
const xml2js = require('xml-js').xml2js;
const lodashGet = require('lodash/get');

module.exports = (callback) => {
    request(process.env.VMIX_PATH, function (error, response, xml) {
        let vmixAPIObject = xml2js(xml, {
            compact: true,
            alwaysArray: true,
        });
        
        callback(lodashGet(vmixAPIObject, 'vmix[0]'));
    });    
};
