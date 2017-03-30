'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var commonModel = require('../common/model');
var utility = require('../common/utility');

// model
var model = commonModel.extendBase();
model.add({
    movieId: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String
    },
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    total_duration: {
        type: Number,
        required: true,
        default: 0
    }
});

// indices
model.index({
    'movieId': 1
});

var mongooseModel = mongoose.model('movies_history', model);

module.exports = mongooseModel;