const vmixService = require('./vmix').getData;
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
            overlayId: parseInt(lodashGet(overlay, '_attributes.number', null)),
            inputId: input ? input.inputId : null,
        };
    }));
};

let byId = async (overlayId) => {
    let overlays = await all();
    return overlays.find((overlay) => {
        return overlay.overlayId === parseInt(overlayId);
    });
};

module.exports = {
    all: all,
    byId: byId,
};