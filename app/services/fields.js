const lodashGet = require('lodash/get');

const getFields = (input) => {
    let textFields = lodashGet(input, 'text', [])
    .map((field) => {
        return {
            fieldId: lodashGet(field, '_attributes.name', null),
            type: 'text',
            text: lodashGet(field, '_text[0]', null),
        };
    });
    let imageFields = lodashGet(input, 'image', [])
        .map((field) => {
            return {
                fieldId: lodashGet(field, '_attributes.name', null),
                type: 'image',
                path: lodashGet(field, '_text[0]', null),
            };
        });
    return [...textFields, ...imageFields];
};

module.exports = {
    getFields
};