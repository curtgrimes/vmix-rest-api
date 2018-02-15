const request = require('request');
const inputService = require('../../services/inputs');

module.exports = async (req, res, next) => {
    let all;
    try {
        all = await inputService.all();
    }
    catch (error) {
        next(error);
        return;
    }
    
    return all ? res.json(all) : res.sendStatus(404);
};
