const inputService = require('../../services/inputs');

module.exports = async (req, res, next) => {
    let single;
    try {
        single = await inputService.byId(req.params.inputId);
    }
    catch (error) {
        next(error);
        return;
    }

    return single ? res.json(single) : res.sendStatus(404);
};
