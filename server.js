'use strict';
const Hapi = require('hapi');
// Create a server with a host, port, and options
const server = new Hapi.Server(),
config = require('./server/config/settings').HapiConfig,
Inert = require('inert');
server.connection({ port: config.port });
server.register(Inert, function () {});

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./server/config/plugins')(server);

// Add the server routes
server.route(require('./server/config/routes')(server));


//Start the server
server.start(function() {
    //Log to the console the host and port info
    console.log('Server started at: ' + server.info.uri);
});
