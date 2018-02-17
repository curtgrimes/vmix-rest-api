var ngrok = require('ngrok');
const config = require('./config').load().vmix_rest_api;

let remoteConnection;

let connect = () => {
    if (!remoteConnection) {
        remoteConnection = new Promise((resolve, reject) => {
            ngrok.connect(
                config.port,
                (error, url) => {
                    if (error) {
                        console.log(error);
                        resolve(false);
                    }
                    else if (url) {
                        resolve(url);
                    }
                }
            );
        });
    }

    return remoteConnection;
};

let getConnectionData = async () => {
    let connection = await connect();
    console.log('here');
    console.log(connection);
    return connection;
}

module.exports = {
    connect,
    getConnectionData,
};