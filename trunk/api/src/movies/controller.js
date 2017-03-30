'use strict';

var Model = require('./model');
var utility = require('../common/utility');
var requestService = require('../common/request-service');


var controller = {};

controller.saveMovieHistory = function(req, res, next) {
    var id = req.params.id;
    var obj = {
        movieId: id,
        duration: req.body.duration,
        total_duration: req.body.totalDuration,
        status: req.body.totalDuration - req.body.duration <= 120 ? 'watched' : 'watching'
    };

    if (req.body.duration == 0) {
        obj.status = '';
    }

    var promise;

    if (req.body._id) {
        promise = Model.update({
            _id: req.body._id
        }, {
            $set: {
                duration: req.body.duration,
                total_duration: req.body.totalDuration,
                status: req.body.totalDuration - req.body.duration <= 120 ? 'watched' : 'watching',
                updatedOn: new Date()
            }
        }).exec();

    } else {
        obj = new Model(obj);
        promise = obj.save();
    }

    promise.then((response) => {
        res.status(200).json({
            message: 'saved'
        });
    }, (err) => {
        res.status(400).json({
            result: err,
            message: 'An error Occured'
        })
    });

};


controller.requestMoviesData = function(req, successFn, errorFn) {
    requestService.request({
        url: 'https://demo2697834.mockable.io/movies',
        successFn: successFn,
        errorFn: errorFn
    });
};

controller.getOnlyMoviesWithHistoryData = function(req, res, next) {
    controller.requestMoviesData(req,
        function(response) {
            controller.getMovieHistory(req, res, next, response, true);
        },
        function(err) {
            res.status(400).json({
                result: err,
                message: 'An error Occured'
            });
        }
    );
};

controller.getMoviesData = function(req, res, next) {
    controller.requestMoviesData(req,
        function(response) {
            controller.getMovieHistory(req, res, next, response, false);
        },
        function(err) {
            res.status(400).json({
                result: err,
                message: 'An error Occured'
            });
        }
    );
};

controller.getMovieHistory = function(req, res, next, moviesData, historyOnly) {
    var promise = Model.find({
        deletedOn: null
    }).exec();

    promise.then((result) => {
        var outResult = [];
        if (moviesData.entries && moviesData.entries.length) {
            result.forEach(function(history, hIndex) {
                moviesData.entries.some(function(movie, mIndex) {
                    if (history.movieId == movie.id) {
                        movie.historyData = history;
                        outResult.push(movie);
                        return true;
                    }
                });
            });
        }
        res.status(200).json({
            result: historyOnly ? outResult : moviesData.entries
        });
    }, (err) => {
        res.status(400).json({
            result: err,
            message: 'An error Occured'
        });
    });
};


module.exports = controller;