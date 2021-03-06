var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.0';
// Defaults that you can access when you require this config.
var apiConfig = {
    root: rootPath,
    port: server_port,
    ip: server_ip_address
}


module.exports = { HapiConfig: apiConfig }
