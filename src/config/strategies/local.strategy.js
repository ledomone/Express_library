/*jslint node: true */
"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName', // can be e-mail or something
            passwordField: 'password'
        },
        function (username, password, done) { //if it is proper sign in 
            var user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
};