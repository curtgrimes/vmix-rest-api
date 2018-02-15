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

    const activeInput = all.find((input) => {
        return input.isActive;
    });

    return activeInput ? res.json(activeInput) : res.sendStatus(204);
};
