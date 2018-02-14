const getVmixData = require('../../services/vmix').getData();
const inputService = require('../../services/inputs');

module.exports = async (req, res) => {
    const all = await inputService.all();
    const activeInput = all.find((input) => {
        return input.isActive;
    });

    return activeInput ? res.json(activeInput) : res.sendStatus(204);
};
