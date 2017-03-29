'use strict';

var rootRoutes = function(app) {
    var contentType = require('./middleware/errorHandler');
    app.use(contentType.handleContentType);

    // users route
    app.use('/api/users', require('./users/route'));
    app.use('/api/oauth', require('./auth/route'));
};

module.exports = rootRoutes;