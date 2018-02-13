
const getVmixData = require('../../services/vmix');
const lodashGet = require('lodash/get');
const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    let inputs = await inputService.all();
    
    let single = inputs.find((input) => {
        return input.key === req.params.inputId;
    });

    return single ? res.json(single) : res.sendStatus(404);
};
