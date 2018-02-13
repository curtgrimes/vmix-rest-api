const vmixService = require('./vmix');
const lodashGet = require('lodash/get');

module.exports = async () => {
    let vmix = await vmixService();
    let inputs = lodashGet(vmix, 'inputs[0].input', []);
    
    // Make 'loop' value a boolean if it's present
    return inputs.map((input) => {
        if (lodashGet(input, '_attributes.loop')) {
            input._attributes.loop = (input._attributes.loop.toLowerCase() === 'true');
        }

        return input;
    });
};
