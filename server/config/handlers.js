var handlers = {};
const boom = require('boom');

handlers.authenticateAdmin = function (request, reply) {
    if (request.payload &&
        request.payload.userName &&
        request.payload.password) {
        var userName = request.payload.userName;
        var password = request.payload.password;
        if (userName === "admin" && password === "admin") {
            var userDetails = { 'username': userName};
            request.cookieAuth.set(userDetails);
            var response = { 'isAuthenticated': true, 'User': userDetails }
            reply(response).redirect('/');
        } else {
            reply().redirect('/error');
            //return reply(boom.unauthorized('invalid email or password'));
        }
    }
}

module.exports = handlers;
