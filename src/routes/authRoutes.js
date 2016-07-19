/*jslint node: true */
"use strict";

var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                // TODO: check if that user doesn't exist!
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', { // use local.strategy
            failureRedirect: '/'
        }), function (req, res) { //if success
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/'); // if you are not logged in - go back to slash / ;-)
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user); // req.user - passport let us know: this guy sign in and there is an information
        });
    return authRouter;
};

module.exports = router;