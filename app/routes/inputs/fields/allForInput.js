const request = require('request');
const inputService = require('../../../services/inputs');

module.exports = async (req, res, next) => {
    let single;
    try {
        single = await inputService.byId(req.params.inputId);
    }
    catch (error) {
        next(error);
        return;
    }
    
    return single ? res.json(single.fields) : res.sendStatus(404);
};
