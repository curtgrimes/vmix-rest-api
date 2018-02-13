const vmixService = require('./vmix');
const lodashGet = require('lodash/get');
const inputService = require('./inputs');

let all = async () => {
    let vmix = await vmixService();
    let overlays = lodashGet(vmix, 'overlays[0].overlay', []);
    return Promise.all(overlays.map(async (overlay) => {
        let input = await inputService.byId(
                            lodashGet(overlay, '_text[0]', null)
                    );

        return {
            number: lodashGet(overlay, '_attributes.number', null),
            input: input ? input.inputId : null,
        };
    }));
};

let byNumber = async (number) => {
    // let inputs = await all();
    // return inputs.filter((input) => {
    //     return input.key === key;
    // });
};

module.exports = {
    all: all,
    byNumber: byNumber,
};