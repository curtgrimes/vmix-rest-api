const inputService = require('../../../services/inputs');

module.exports = async (req, res, next) => {
    let single;
    try {
        single = await inputService.byId(req.params.inputId);
    }
    catch (error) {
        next(error);
        return;
    }

    let singleField = single.fields.find((field) => {
        return field.fieldId === req.params.fieldId;
    });
    
    return singleField ? res.json(singleField) : res.sendStatus(404);
};
