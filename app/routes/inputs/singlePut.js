const stringToBoolean = require('../../util/stringToBoolean');
const inputService = require('../../services/inputs');
const vmixService = require('../../services/vmix');
const transitionEffects = require('../../services/transitions').effects;

module.exports = async (req, res, next) => {
    let single;
    try {
        single = await inputService.byId(req.params.inputId);
    }
    catch (error) {
        next(error);
        return;
    }

    let success, transitionEffect;

    if (!single) {
        res.sendStatus(404);
        return;
    }

    if (req.query.transitionEffect) {
        let transitionEffectIndex = transitionEffects.map((effect) => { return effect.toLowerCase();})
                                        .indexOf(req.query.transitionEffect.toLowerCase());
        if (transitionEffectIndex >= 0) {
            // Valid transition value also provided
            transitionEffect = transitionEffects[transitionEffectIndex];
        }
    }

    const newIsActive = stringToBoolean(req.query.isActive);

    if (typeof(newIsActive) === 'boolean' && newIsActive !== single.isActive) {
        // Make active input preview and make preview active
        if (newIsActive === true) {
            // Cut to this input
            success = await vmixService.execute(transitionEffect ? transitionEffect : 'Cut', single.inputId);
        }
        else {
            // Cut away from this input (to the preview -- I couldn't find
            // a simple way to just blank the active view without a fade
            // and without making a new input).
            success = await vmixService.execute(transitionEffect ? transitionEffect : 'Cut', inputService.PREVIEW_INPUT_ID);
        }

        if (success) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
    else {
        // No changes to make
        res.sendStatus(200);
    }
};
