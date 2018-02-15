
const overlayService = require('../../services/overlays');

module.exports = async (req, res, next) => {
    try {
        const overlays = await overlayService.all();
    }
    catch (error) {
        next(error);
        return;
    }
    
    let single = overlays.find((overlay) => {
        return overlay.overlayId === parseInt(req.params.overlayId);
    });

    return single ? res.json(single) : res.sendStatus(404);
};
