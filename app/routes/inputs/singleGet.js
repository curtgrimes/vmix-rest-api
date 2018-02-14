const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    const single = await inputService.byId(req.params.inputId);
    return single ? res.json(single) : res.sendStatus(404);
};
