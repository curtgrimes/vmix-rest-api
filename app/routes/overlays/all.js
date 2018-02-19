const request = require('request');
const overlayService = require('../../services/overlays');

module.exports = async (req, res) => {
    let all = await overlayService.all();
    return all ? res.json(all) : res.sendStatus(404);
};
