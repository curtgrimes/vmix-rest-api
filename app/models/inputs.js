const getVmixData = require('../vmix');
const lodashGet = require('lodash/get');

module.exports = (callback) => {
    getVmixData((vmixData) => {
        let inputs = lodashGet(vmixData, 'inputs[0].input', []);
        
        // Make 'loop' value a boolean if it's present
        inputs = inputs.map((input) => {
            if (lodashGet(input, '_attributes.loop')) {
                input._attributes.loop = (input._attributes.loop.toLowerCase() === 'true');
            }

            return input;
        });

        callback(inputs);
    });
};
