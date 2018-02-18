// Before requiring ngrok apply a monkeypatch to fix an issue where
// th ngrok binary can't be called by the system if we're running
// as a packaged app. This is specific to Windows but I haven't tested
// if a similar change would be needed on other platforms (I think it would).
// This changes the behavior of the first spawn() called in ngrok/index.js
(function() {
    let path = require('path');
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        let command = arguments[0];
        let commandArgs = arguments[1];
        let settings = arguments[2];

        if (command === './ngrok.exe') {
            // Running on Windows platform
            command = path.join(process.cwd(), "lib", "ngrok.exe");

            // ngrok sets a cwd that we want to ignore because it will
            // be a reference to the /snapshot path that doesn't exist
            // to the outside system, and it fails when you give it a
            // cwd that doesn't exist
            // https://github.com/nodejs/node/issues/11520
            settings = {};
        }
        return oldSpawn.apply(this, [command, commandArgs, settings]);
    }
    childProcess.spawn = mySpawn;
})();

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