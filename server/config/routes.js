var handlers = require(__dirname + '/handlers');
module.exports = function (server) {
    var routes = [
        {
            path: '/',
            method: 'GET',
            handler: function (request, reply) {
                if (!request.auth.isAuthenticated) {
                    return reply.redirect('/login');
                }
                
                reply.file('./public/index.html');
            }
        },
        {
            path: '/login',
            method: 'GET',
            handler: function (request, reply) {
                reply.file('./public/login.html');
            }
        },
        {
            path: '/error',
            method: 'GET',
            handler: function (request, reply) {
                reply.file('./public/error.html');
            }
        },
        {
            path: '/css/{path*}',
            method: 'GET',
            handler: {
                directory: {
                    path: './public/css'
                }
            }
        },
        {
            path: '/images/{path*}',
            method: 'GET',
            handler: {
                directory: {
                    path: './public/images'
                }
            }
        },
        {
            path: '/js/{path*}',
            method: 'GET',
            handler: {
                directory: {
                    path: './public/js'
                }
            }
        },
        {
            path: '/authenticate',
            method: 'POST',
            config: {
                auth: { mode: 'try', strategy: "session" },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: handlers.authenticateAdmin
            }
        }];

    return routes;
};