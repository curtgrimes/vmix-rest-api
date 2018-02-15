const yamljs = require('yamljs');

let config;

const getPath = () => {
    return process.cwd() + '/'
            + (process.env.CONFIG_PATH
                ? process.env.CONFIG_PATH // Use environment variable
                : 'config.yml' // Look for it in the current directory
            );
};

const load = () => {
    try {
        config = yamljs.load(getPath());
        return config;
    }
    catch (error) {
        return false;
    }
};

module.exports = {
    load,
    getPath,
}