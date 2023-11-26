/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');
const bookSchema = require('./book.schema');

router.get('/', bookController.getAllBooks);

router.get('/:id', bookSchema.validateId, bookController.getBookById);

router.post('/', bookSchema.validateCreateBook, bookController.createBook);

module.exports = router;
