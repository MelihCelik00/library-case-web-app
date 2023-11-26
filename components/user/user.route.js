/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const userSchema = require('./user.schema');

/**
* @swagger
*  /users:
*    get:
*      summary: Get User List
*      tags: [User]
*      security:
*        - ApiKeyAuth: []
*      responses:
*        "200":
*          description: Successfully fetched all users.
*        "401":
*          description: Unauthorized request.
*        "403":
*          description: Access denied.
*/
router.get('/', userController.getAllUsers);

/**
 * @swagger
 *  /users/{id}:
 *    get:
 *      summary: Get User
 *      tags: [User]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *      responses:
 *        "200":
 *          description: User fetched.
 *        "401":
 *          description: Unauthorized user.
 *        "403":
 *          description: Access denied.
 *        "404":
 *          description: Bad request, value(s) are wrong.
 */
router.get('/:id', userSchema.validateId, userController.getUserById);

/**
 * @swagger
 *  /users:
 *    post:
 *      summary: Creates new library user
 *      tags: [User]
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
 *          description: User created.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "409":
 *          description: Email exists.
 */
router.post('/', userSchema.validateCreateUser, userController.createUser);

/**
 * @swagger
 *  /users/{userId}/borrow/{bookId}:
 *    post:
 *      summary: Borrow a book
 *      tags: [User]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *        - in: path
 *          name: bookId
 *          type: integer
 *      responses:
 *        "200":
 *          description: Book borrowed successfully.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "409":
 *          description: Email exists.
 */
router.post('/:userId/borrow/:bookId',
    userSchema.validatePostIds,
    userController.borrowBook);

/**
 * @swagger
 *  /users/{userId}/return/{bookId}:
 *    post:
 *      summary: Return a book
 *      tags: [User]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *        - in: path
 *          name: bookId
 *          type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  score:
 *                    type: number
 *                    minimum: 0
 *                    maximum: 10
 *                    required: true
 *      responses:
 *        "200":
 *          description: Returned book successfully.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "409":
 *          description: Email exists.
 */
router.post('/:userId/return/:bookId',
    userSchema.validatePostIds,
    userSchema.validateReturnBody,
    userController.returnBook);

module.exports = router;
