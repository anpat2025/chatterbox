module.exports = function (server) {

    var inert = require('inert');

    server.register(inert, function (err) {
        if (err) {
            throw err;
        }
    });    

    server.register(require('hapi-auth-cookie'), function (err) {
        if (err) {
            throw err;
        }
        //caching cookies
        // const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
        // server.app.cache = cache;

        server.auth.strategy('session', 'cookie', 'try', {
            password: 'password-should-be-32-characters',
            cookie: 'webAuth',
            redirectTo: false,
            isSecure: false,
            keepAlive: true,
            ttl: (45 * 24 * 60 * 60 * 1000)
        });
    })
};