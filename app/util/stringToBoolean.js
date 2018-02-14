module.exports = (input) => {
    if (!(typeof input === 'string')) {
        return;
    }

    if (input.toLowerCase() === 'true') {
        return true;
    }
    else if (input.toLowerCase() === 'false') {
        return false;
    }
    else {
        return;
    }
};