
const getVmixData = require('../../services/vmix');
const lodashGet = require('lodash/get');
const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    let inputs = await inputService();
    
    let single = inputs.find((input) => {
        return lodashGet(input, '_attributes.key') === req.params.inputId;
    });

    if (single['_attributes']) {
        return res.json(single['_attributes']);
    }
    else {
        return res.sendStatus(404);
    }
};
