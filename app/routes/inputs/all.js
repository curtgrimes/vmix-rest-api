const request = require('request');
const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    let inputs = await inputService();
    if (inputs) {
        return res.json(inputs.map((input) => {
            return input['_attributes'];
        }));
    }
    else {
        return res.sendStatus(404);
    }
};
