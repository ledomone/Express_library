/*jslint node: true */
"use strict";

var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql'); // its that same like in app.js

var router = function (nav) {
    var books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
},
        {
            title: 'Les Misérables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
},
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
},
        {
            title: 'A Journey into the Center of the Earth',
            genre: 'Science Fiction',
            author: 'Jules Verne',
            read: false
},
        {
            title: 'The Dark World',
            genre: 'Fantasy',
            author: 'Henry Kuttner',
            read: false
},
        {
            title: 'The Wind in the Willows',
            genre: 'Fantasy',
            author: 'Kenneth Grahame',
            read: false
},
        {
            title: 'Life On The Mississippi',
            genre: 'History',
            author: 'Mark Twain',
            read: false
},
        {
            title: 'Childhood',
            genre: 'Biography',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
}
];

    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();

            request.query('select * from books',
                function (err, recordset) { // recordset is already JSON formated
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Single Book',
                nav: nav,
                book: books[id]
            });
        });

    return bookRouter;
};


module.exports = router;