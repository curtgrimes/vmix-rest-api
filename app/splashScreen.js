const config = require('./config');
const figlet = require('figlet');
const pad = require('pad');
const vmix = require('./services/vmix');
let remoteAccess = require('./remoteAccess');
// const font = require('figlet/fonts/Standard.flf');
// const version = require('./util/packageVersion').version;
var table = require('table').table;
var wordwrap = require('wordwrap');
var center = require('center-align');
const chalk = require('chalk');
 
module.exports = async () => {

  console.log(chalk.yellowBright.bold(" \
      __  __ _        ____  _____ ____ _____      _    ____ ___\n\
__   _|  \\/  (_)_  __ |  _ \\| ____/ ___|_   _|    / \\  |  _ \\_ _|\n\
\\ \\ / / |\\/| | \\ \\/ / | |_) |  _| \\___ \\ | |     / _ \\ | |_) | |\n\
 \\ V /| |  | | |>  <  |  _ <| |___ ___) || |    / ___ \\|  __/| |\n\
  \\_/ |_|  |_|_/_/\\_\\ |_| \\_\\_____|____/ |_|   /_/   \\_\\_|  |___|\n\
  "));

  // console.log(chalk.blueBright(figlet.textSync('vMix REST API')));
  // console.log(center('Version '+version + '\n', 65));
  console.log(center('Version 0.3.0\n', 63));
  console.log(center('Visit '+ chalk.magentaBright('https://curtgrimes.github.io/vmix-rest-api/') + ' for documentation.\n', 75));

  let connectedToVmix,
      vmixConnectionRetryInterval,
      remoteConnectionPath;
  
  const configData = config.load();

  if (!configData) {
    console.log(wordwrap(0,70)(chalk.red.bold('Looking for config file and could not find it at '+config.getPath()+'. Make sure that config.yml is present in the same folder as this file.\n')));
    return;
  }

  if (!(await vmix.connected())) {
    console.log(wordwrap(0,70)(chalk.red.bold('Unable to connect to vMix at '+ configData.vmix_rest_api.vmix_path +'. Make sure vMix is running, Web Controller is on, and you\'ve set the correct Web Controller URL in the config file located at '+ config.getPath() +'.\n\nRestart the vMix REST API to try again.')));
    return;
  }
  
  if (configData.vmix_rest_api.remote_access.enabled) {
    remoteConnectionPath = await remoteAccess.connect();
  }
  
  console.log(center('Open '+ chalk.greenBright('http://localhost:' + configData.vmix_rest_api.port) + ' in a browser to begin.\n', 75));

  console.log(table([
    [chalk.bold('vMix REST API'), 'http://localhost:'+ configData.vmix_rest_api.port],
    ...(remoteConnectionPath ? [[chalk.bold('Remote Access'), remoteConnectionPath]] : []),
    ...(remoteConnectionPath && configData.vmix_rest_api.remote_access.remote_web_controller ? [[chalk.bold('Web Controller Remote Access'), remoteConnectionPath + '/web-controller']] : []),
    
    [chalk.bold('Local Web Controller'), configData.vmix_rest_api.vmix_path],
    [chalk.bold('Config'), config.getPath()],
  ], {
    columns: {
      0: {
        width: 25,
      },
      1: {
        width: 33,
      },
    }
  }));
};