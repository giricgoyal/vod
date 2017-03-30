'use strict';

var rootRoutes = function(app) {
    var contentType = require('./middleware/errorHandler');
    app.use(contentType.handleContentType);

    // users route
    app.use('/api/users', require('./users/route'));
    app.use('/api/oauth', require('./auth/route'));

    // movie routes
    app.use('/api/movies', require('./movies/route'));
};

module.exports = rootRoutes;