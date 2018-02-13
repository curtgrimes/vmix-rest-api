const vmixService = require('./vmix');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

let all = async () => {
    let vmix = await vmixService();
    let inputs = lodashGet(vmix, 'inputs[0].input', []);
    
    // Make 'loop' value a boolean if it's present
    return inputs.map((input) => {
        return {
            inputId: parseInt(lodashGet(input, '_attributes.number', null)),
            type: lodashGet(input, '_attributes.type', null),
            title: lodashGet(input, '_attributes.title', null),
            state: lodashGet(input, '_attributes.state', null),
            position: parseInt(lodashGet(input, '_attributes.position', null)),
            duration: parseInt(lodashGet(input, '_attributes.duration', null)),
            loop: boolean(lodashGet(input, '_attributes.loop', null)),
        };

        if (lodashGet(input, '_attributes.loop')) {
            input._attributes.loop = (input._attributes.loop.toLowerCase() === 'true');
        }

        return input['_attributes'];
    });
};

let byId = async (inputId) => {
    let inputs = await all();
    return inputs.find((input) => {
        return input.inputId === parseInt(inputId);
    });
};

module.exports = {
    all: all,
    byId: byId,
};