var path = require('path'),
    rootPath = path.normalize(__dirname + '/../..');

// Defaults that you can access when you require this config.
var apiConfig = {
    root: rootPath,
    port: parseInt(process.env.PORT, 10) || 3000,
    ip: '0.0.0.0'
}


module.exports = { HapiConfig: apiConfig }