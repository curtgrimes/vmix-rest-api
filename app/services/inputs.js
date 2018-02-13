const vmixService = require('./vmix');
const lodashGet = require('lodash/get');

let all = async () => {
    let vmix = await vmixService();
    let inputs = lodashGet(vmix, 'inputs[0].input', []);
    
    // Make 'loop' value a boolean if it's present
    return inputs.map((input) => {
        if (lodashGet(input, '_attributes.loop')) {
            input._attributes.loop = (input._attributes.loop.toLowerCase() === 'true');
        }

        return input['_attributes'];
    });
};

let byNumber = async (number) => {
    let inputs = await all();
    return inputs.find((input) => {
        return input.number === number;
    });
};

module.exports = {
    all: all,
    byNumber: byNumber,
};