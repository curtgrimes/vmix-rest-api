const request = require('request');
const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    let all = await inputService.all();
    return all ? res.json(all) : res.sendStatus(404);
};
