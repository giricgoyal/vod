'use strict';

// import npm modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// import project modules
var controller = require('./controller');


/**
 *  API to save or edit movie history
 * 
 *  API:
 *      POST /api/movies/history/:id
 * 
 *  Body Params: 
 *      _id: string
 *      duration: Number (required)
 *      totalDuration: Number (required)
 * 
 *  Search Params:
 *      id: string (required)
 */
router.post('/history/:id',
    (req, res, next) => {
        next();
    },
    controller.saveMovieHistory
);

/**
 *  API to get only movies with history data
 * 
 *  API:
 *      GET /api/movies/history
 */
router.get('/history',
    (req, res, next) => {
        next();
    },
    controller.getOnlyMoviesWithHistoryData
);


/**
 *  API to get all movies data with history
 * 
 *  API:
 *      GET /api/movies
 */
router.get('/',
    (req, res, next) => {
        next();
    },
    controller.getMoviesData
);

module.exports = router;