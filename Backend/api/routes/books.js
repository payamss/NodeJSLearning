const express = require('express');
const router = express.router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-Auth');
const Book = require('../../models/book');
router.get("/all-book", checkAuth, (req, res, next) => {
    Book.find()
        .exec()
        .then(docs => {
            const response = {
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        author: doc.author,
                        _id: doc._id,
                        isbn: doc.isbn,
                        price: doc.price,
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get("/book-details/:bookId", checkAuth, (req, res, next) => {
    Book.find({
            _id: id
        })
        .exec()
        .then(docs => {
            const response = {
                books: docs.map(doc => {
                    return {
                        title: doc.title,
                        author: doc.author,
                        _id: doc._id,
                        isbn: doc.isbn,
                        price: doc.price,
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.post("/add-book", checkAuth, (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        price: req.body.price,

    });
    book
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Book Successfully Added",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});