const inputService = require('../../../services/inputs');
const vmixService = require('../../../services/vmix');

module.exports = async (req, res, next) => {
    let singleInput, singleField;
    try {
        singleInput = await inputService.byId(req.params.inputId);
    }
    catch (error) {
        next(error);
        return;
    }

    singleField = singleInput.fields.find((field) => {
        return field.fieldId === req.params.fieldId;
    });

    if (!singleField) {
        res.sendStatus(404);
        return;
    }

    if (req.body.text && req.body.type === "text") {
        if (singleField.text === req.body.text) {
            // New text is same as current text;
            // nothing to change
            res.sendStatus(304); // Not modified
            return;
        }

        success = await vmixService.execute({
            functionName: 'SetText',
            inputId: singleInput.inputId,
            selectedName: singleField.fieldId,
            value: req.body.text,
        });
    }

    if (req.body.path && req.body.type === "image") {
        if (singleField.path === req.body.path) {
            // New path is same as current path;
            // nothing to change
            res.sendStatus(304); // Not modified
            return;
        }

        success = await vmixService.execute({
            functionName: 'SetImage',
            inputId: singleInput.inputId,
            selectedName: singleField.fieldId,
            value: req.body.path,
        });
    }

    if (success) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(500);
    }
};
