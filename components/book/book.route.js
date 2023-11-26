/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const bookController = require('./book.controller');
const bookSchema = require('./book.schema');

/**
* @swagger
*  /books:
*    get:
*      summary: Get Book List
*      tags: [Book]
*      security:
*        - ApiKeyAuth: []
*      responses:
*        "200":
*          description: Successfully fetched all books.
*        "401":
*          description: Unauthorized request.
*        "403":
*          description: Access denied.
*/
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 *  /books/{id}:
 *    get:
 *      summary: Get Book
 *      tags: [Book]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *      responses:
 *        "200":
 *          description: Book fetched.
 *        "401":
 *          description: Unauthorized user.
 *        "403":
 *          description: Access denied.
 *        "404":
 *          description: Bad request, value(s) are wrong.
 */
router.get('/:id', bookSchema.validateId, bookController.getBookById);

/**
 * @swagger
 *  /books:
 *    post:
 *      summary: Creates a new book
 *      tags: [Book]
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *      responses:
 *        "201":
 *          description: New book created.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "409":
 *          description: Email exists.
 */
router.post('/', bookSchema.validateCreateBook, bookController.createBook);

module.exports = router;
