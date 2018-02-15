const overlayService = require('../../services/overlays');

module.exports = async (req, res, next) => {
    let all;
    try {
        all = await overlayService.all();
    }
    catch (error) {
        next(error);
        return;
    }

    return all ? res.json(all) : res.sendStatus(404);
};
