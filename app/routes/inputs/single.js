
const getVmixData = require('../../vmix');
const lodashGet = require('lodash/get');
const getInputs = require('../../models/inputs');

module.exports = (req, res) => {
    getInputs((inputs) => {
        let single = inputs.find((input) => {
            return lodashGet(input, '_attributes.key') === req.params.inputId;
        });

        if (single['_attributes']) {
            return res.json(single['_attributes']);
        }
        else {
            return res.sendStatus(404);
        }
    });
};
