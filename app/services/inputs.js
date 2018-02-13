const vmixService = require('./vmix');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

let all = async () => {
    const vmixData = await vmixService();
    const inputs = lodashGet(vmixData, 'inputs[0].input', []);
    
    const activeInputId = parseInt(lodashGet(vmixData, 'active[0]._text[0]'));
    const previewInputId = parseInt(lodashGet(vmixData, 'preview[0]._text[0]'));

    // Make 'loop' value a boolean if it's present
    return inputs.map((input) => {
        const inputId = parseInt(lodashGet(input, '_attributes.number', null));
        
        return {
            inputId: inputId,
            type: lodashGet(input, '_attributes.type', null),
            title: lodashGet(input, '_attributes.title', null),
            state: lodashGet(input, '_attributes.state', null),
            position: parseInt(lodashGet(input, '_attributes.position', null)),
            duration: parseInt(lodashGet(input, '_attributes.duration', null)),
            loop: boolean(lodashGet(input, '_attributes.loop', null)),
            isActive: activeInputId === inputId,
            isPreview: previewInputId === inputId,
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