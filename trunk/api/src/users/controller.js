'use strict';

var Model = require('./model');
var ClientModel = require('./clients/model');
var utility = require('../common/utility');
var bcrypt = require('bcrypt-nodejs');
var otplib = require('otplib');
var controller = {};

controller.login = function(req, res, next) {
    var username = req.body.phonenumber;
    var password = req.body.password;

    var objToFind = {};
    objToFind.deletedOn = null;
    if (isNaN(username)) {
        objToFind.email = username;
    } else {
        objToFind.phonenumber = username;
    }

    var promise = Model.findOne(objToFind).exec();
    promise.then(function(result) {
            if (!result) {
                res.status(400).json({
                    message: 'User does not exist'
                });
            }

            var phonenumber = result.phonenumber;
            bcrypt.compare(password, result.password, function(err, isMatch) {
                if (err) {
                    res.status(400).json({
                        message: 'Error occured. Please try again.',
                        result: err
                    });
                } else if (isMatch) {
                    var clientObj = {
                        clientId: utility.generateRandomString(),
                        clientSecret: utility.generateRandomString(),
                    };

                    var promise = ClientModel.update({
                        phonenumber: phonenumber
                    }, {
                        $set: {
                            updatedOn: new Date(),
                            clientId: clientObj.clientId,
                            clientSecret: clientObj.clientSecret
                        }
                    }).exec();

                    promise.then((data) => {
                        res.status(200).json({
                            result: {
                                firstname: result.firstname,
                                lastname: result.lastname,
                                clientId: clientObj.clientId,
                                clientSecret: clientObj.clientSecret,
                                userId: result._id,
                                is_admin: result.admin,
                                access_type: result.access_type
                            }
                        });
                    }, (err) => {
                        res.status(400).json({
                            message: 'Error Occured. Please try again.',
                            result: innererror
                        });
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid password.'
                    });
                }
            });
        },
        function(err) {
            res.status(400).json({
                message: 'Error Occured. Please try again.',
                result: err
            });
        });
};

controller.signup = function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var phonenumber = req.body.phonenumber;
    var password = req.body.password;
    var email = req.body.email;

    var userobj = {
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        password: password,
        email: email
    };

    userobj = new Model(userobj);

    var clientObj = {
        phonenumber: phonenumber,
        clientId: utility.generateRandomString(),
        clientSecret: utility.generateRandomString(),
    };

    clientObj = new ClientModel(clientObj);

    var clientPromise = clientObj.save();

    var userpromise = userobj.save();
    userpromise.then(function(result) {
        clientPromise.then(function(innerRes) {
            clientObj.userId = result._id;
            clientObj.isAdmin = result.admin;
            clientObj.access_type = result.access_type;

            //  utility.sendEmail('"apnaDoctor" <noreply@apnadoctor.online>', email, 'Welcome to apnaDoctor', 'Welcome to apnaDoctor', 'Your OTP is ' + code);

            res.status(200).json({
                message: 'Singup Successfull.',
                result: clientObj
            });
        }, function(err) {
            res.status(400).json({
                message: 'Cannot Singup.',
                result: err
            });
        });
    }, function(err) {
        res.status(400).json({
            message: 'Cannot Singup.',
            result: err
        });
    });
};

controller.getOne = function(req, res, next) {
    var id = req.params.id;
    var promise = Model.findOne({
        _id: id,
        deletedOn: null
    }).exec();
    promise.then(function(result) {
        res.status(200).json({
            result: result
        });
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.deleteOne = function(req, res, next) {
    var id = req.params.id;
    var promise = Model.update({
        _id: id
    }, {
        $set: {
            updatedOn: new Date(),
            deletedOn: new Date()
        }
    }).exec();
    promise.then(function(result) {
        res.status(200).json({
            result: result
        });
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.profile = function(req, res, next) {
    var userId = req.params.userId;

    var promise = Model.findOne({
        deletedOn: null,
        _id: userId
    }).exec();

    promise.then(function(result) {
        if (!result) {
            res.status(400).json({
                message: 'User does not exist'
            });
        } else {
            var data = {
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                phonenumber: result.phonenumber
            };
            res.status(200).json({
                result: data
            });
        }
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

module.exports = controller;