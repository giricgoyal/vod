'use strict';

var config = {};

var processArgs = process.argv;
process.env.ENV = process.argv.indexOf('--env') > -1 ? processArgs[process.argv.indexOf('--env') + 1] : 'localhost';

var env = process.env.ENV;

console.log('starting server on ' + env);

var mongodbConfig = {
    localhost: {
        ip: 'localhost',
        db: 'vodapp'
    },
    staging: {
        ip: 'localhost',
        db: 'vodapp'
    },
    live: {
        ip: 'localhost',
        db: ''
    }
};

var serverConfig = {
    localhost: {
        port: 3000
    },
    staging: {
        port: 3901
    },
    live: {
        port: 3001
    }
}

var security = {
    tokenLife: 10 * 24 * 60 * 60
};


var mailerConfig = {
    localhost: {
        host: '',
        port: 26,
        username: '',
        password: '',
    },
    staging: {
        host: '',
        port: 26,
        username: '',
        password: '',
    },
    live: {
        host: '',
        port: 26,
        username: '',
        password: '',
    }
}

config.mongodb = mongodbConfig[env];
config.security = security;
config.server = serverConfig[env];
config.mailerConfig = mailerConfig[env];

module.exports = config;