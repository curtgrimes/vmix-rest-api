const vmixService = require('./vmix');
const fieldService = require('./fields');
const lodashGet = require('lodash/get');
const boolean = require('boolean');

let all = async () => {
    const vmixData = await vmixService.getData();
    const inputs = lodashGet(vmixData, 'inputs[0].input', []);
    
    const activeInputId = parseInt(lodashGet(vmixData, 'active[0]._text[0]'));
    const previewInputId = parseInt(lodashGet(vmixData, 'preview[0]._text[0]'));

    return inputs.map((input) => {
        const inputId = parseInt(lodashGet(input, '_attributes.number', null));

        // List
        let list = lodashGet(input, 'list[0].item', []).map((listItem) => {
            return {
                path: lodashGet(listItem, '_text[0]', null),
                selected: boolean(lodashGet(listItem, '_attributes.selected', null)),
            };
        });

        let meterL = lodashGet(input, '_attributes.meterF1', null);
        let meterR = lodashGet(input, '_attributes.meterF2', null);

        return {
            inputId: inputId,
            type: lodashGet(input, '_attributes.type', null),
            title: lodashGet(input, '_attributes.title', null),
            state: {
                running: lodashGet(input, '_attributes.state', null) === 'Running',
                paused: lodashGet(input, '_attributes.state', null) === 'Paused',
                completed: lodashGet(input, '_attributes.state', null) === 'Completed',
            },
            isActive: activeInputId === inputId,
            isPreview: previewInputId === inputId,

            media: {
                position: parseFloat(lodashGet(input, '_attributes.position', null)),
                duration: parseFloat(lodashGet(input, '_attributes.duration', null)),
                loop: boolean(lodashGet(input, '_attributes.loop', null)),
                muted: (lodashGet(input, '_attributes.muted', null) ? boolean(lodashGet(input, '_attributes.muted', null)) : null),
                volume: (lodashGet(input, '_attributes.volume', null) ? parseInt(lodashGet(input, '_attributes.volume', null)) : null),
                balance: (lodashGet(input, '_attributes.balance', null) ? parseInt(lodashGet(input, '_attributes.balance', null)) : null),
                solo: (lodashGet(input, '_attributes.solo', null) ? boolean(lodashGet(input, '_attributes.solo', null)) : null),
                audiobusses: (lodashGet(input, '_attributes.audiobusses', null) ? lodashGet(input, '_attributes.audiobusses', null) : null),
                audioMeter: {
                    left: parseFloat(meterL),
                    right: parseFloat(meterR),
                },
            },

            // List
            list: (list.length ? list : null),

            // Put last
            fields: fieldService.getFields(input),
        };

        // Make 'loop' value a boolean if it's present
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

let makeActive = (inputId) => {
    return vmixService.exec('CutDirect', inputId);
};

module.exports = {
    all: all,
    byId: byId,
    makeActive: makeActive,
    PREVIEW_INPUT_ID: 0,
    ACTIVE_INPUT_ID: -1,
};