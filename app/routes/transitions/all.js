const transitionService = require('../../services/transitions');

module.exports = async (req, res, next) => {
    let all;
    
    try {
        all = await transitionService.all();
    }
    catch (error) {
        next(error);
        return;
    }
    
    return all ? res.json(all) : res.sendStatus(404);
};
