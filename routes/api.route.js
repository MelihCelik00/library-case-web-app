/* eslint-disable new-cap */
const router = require('express').Router();

router.use('/users', require('../components/user/user.route'));
router.use('/books', require('../components/book/book.route'));

module.exports = router;
