/*jslint node: true */
"use strict";

var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) {
//        if (!req.user) {
//            res.redirect('/'); // if you are not logged in - go back to slash / ;-)
//        }
        next();
    };

    var getIndex = function (req, res) {

        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                // TODO: check if not error and then:
                res.render('bookListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
            });
        });
    };

    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.findOne({
                _id: id
            }, function (err, results) {
                // TODO: check if not error and then:

                bookService.getBookById(results.bookId, function (err, book) {
                    results.book = book;
                    res.render('bookView', {
                        title: 'Book',
                        nav: nav,
                        book: results
                    });
                });
            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    }
};

module.exports = bookController;