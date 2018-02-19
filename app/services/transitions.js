const vmixService = require('./vmix');
const lodashGet = require('lodash/get');

let all = async () => {
    let vmix = await vmixService();
    let transitions = lodashGet(vmix, 'transitions[0].transition', []);
    
    return transitions.map((transition) => {
        return {
            transitionId: parseInt(lodashGet(transition, '_attributes.number', null)),
            effect: lodashGet(transition, '_attributes.effect', null),
            duration: parseInt(lodashGet(transition, '_attributes.duration', null)),
        };
    });
};

let byId = async (transitionId) => {
    let transitions = await all();
    return transitions.find((transition) => {
        return transition.transitionId === transitionId;
    });
};

module.exports = {
    all: all,
    byId: byId,
};