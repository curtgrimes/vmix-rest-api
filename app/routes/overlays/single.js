
const overlayService = require('../../services/overlays');

module.exports = async (req, res, next) => {
    let overlays;
    
    try {
        overlays = await overlayService.all();
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
