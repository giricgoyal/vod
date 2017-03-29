'use strict';

// import npm modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// import project modules
var controller = require('./controller');

router.post('/signup',
    (req, res, next) => {
        next();
    },
    controller.signup
);

router.post('/login',
    (req, res, next) => {
        next();
    },
    controller.login
);

router.get('/profile/:userId',
    passport.authenticate('bearer', {
        session: false
    }),
    (req, res, next) => {
        next();
    },
    controller.profile
);

module.exports = router;