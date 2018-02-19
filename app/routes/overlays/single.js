
const getVmixData = require('../../services/vmix');
const lodashGet = require('lodash/get');
const overlayService = require('../../services/overlays');

module.exports = async (req, res) => {
    let overlays = await overlayService.all();
    
    let single = overlays.find((overlay) => {
        return overlay.overlayId === parseInt(req.params.overlayId);
    });

    return single ? res.json(single) : res.sendStatus(404);
};
