const request = require('request');
const getInputs = require('../../models/inputs');

module.exports = (req, res) => {
    getInputs((inputs) => {
        if (inputs) {
            return res.json(inputs.map((input) => {
                return input['_attributes'];
            }));
        }
        else {
            return res.sendStatus(404);
        }
    });
};
