/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const userSchema = require('./user.schema');

router.get('/', userController.getAllUsers);

router.get('/:id', userSchema.validateId, userController.getUserById);

router.post('/', userSchema.validateCreateUser, userController.createUser);

router.post('/:userId/borrow/:bookId',
    userSchema.validatePostIds,
    userController.borrowBook);

router.post('/:userId/return/:bookId',
    userSchema.validatePostIds,
    userSchema.validateReturnBody,
    userController.returnBook);

module.exports = router;
