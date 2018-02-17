const configData = require('./config').load();
let remoteAccess = require('./remoteAccess');

module.exports = async () => {
    let remoteConnectionPath = await remoteAccess.connect();
    return '<h1>vMix REST API</h1>\
        <p><a href="https://curtgrimes.github.io/vmix-rest-api/" target="_blank">Full API Documentation</a></p>\
        <p><a href="https://github.com/curtgrimes/vmix-rest-api/" target="_blank">GitHub</a></p>\
        <ul>\
            <li>vMix REST API base path: <strong>http://localhost:' + configData.vmix_rest_api.port +'/api/rest/v1</strong>\
                <ul>\
                    <li>Example: Get all inputs <a href="http://localhost:' + configData.vmix_rest_api.port +'/api/rest/v1/inputs" target="_blank">http://localhost:' + configData.vmix_rest_api.port +'/api/rest/v1/inputs</a></li>\
                    <li>Example: Get all overlays <a href="http://localhost:' + configData.vmix_rest_api.port +'/api/rest/v1/overlays" target="_blank">http://localhost:' + configData.vmix_rest_api.port +'/api/rest/v1/overlays</a></li>\
                </ul>\
            </li>\
        '+ (remoteConnectionPath ? '\
            <li>Remote access base path: <strong>'+ remoteConnectionPath +'</strong>\
                <ul>\
                    <li>Example: Get all inputs <a href="'+ remoteConnectionPath +'/api/rest/v1/inputs" target="_blank">'+ remoteConnectionPath +'/api/rest/v1/inputs</a></li>\
                    <li>Example: Get all overlays <a href="'+ remoteConnectionPath +'/api/rest/v1/overlays" target="_blank">'+ remoteConnectionPath +'/api/rest/v1/overlays</a></li>\
                </ul>\
            </li>\
            '+ (configData.vmix_rest_api.remote_access.remote_web_controller ? '\
                <li>Web Controller Remote Path:  <a href="'+ remoteConnectionPath +'/web-controller" target="_blank">'+ remoteConnectionPath +'/web-controller</a></li>\
            ' : '')+'\
        ' : '')
        
        +'\
        </ul>\
    ';
};