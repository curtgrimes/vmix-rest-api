const request = require('request');
const transitionService = require('../../services/transitions');

module.exports = async (req, res) => {
    let all = await transitionService.all();
    return all ? res.json(all) : res.sendStatus(404);
};
