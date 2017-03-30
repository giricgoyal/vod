'use strict';

var request = require('request');

var exports = {};


/**
 *  obj = {
 *      url:
 *      payload:
 *      headers:
 *      errorFn:
 *      successFn:
 *  }
 */
exports.request = function(obj) {
    var options = {
        url: obj.url,
        method: obj.method || 'GET',
        form: obj.payload
    };

    if (obj.headers) {
        options.headers = obj.headers;
    }

    console.log(`API : ${options.method} : ${options.url}`);
    request(options, function(err, res, body) {
        if ((err || res.statusCode >= 500) && obj.errorFn) {
            obj.errorFn(err || body);
            return;
        }

        if (obj.successFn) {
            body = JSON.parse(body);
            obj.successFn(body);
            return;
        }
    })
};

module.exports = exports;