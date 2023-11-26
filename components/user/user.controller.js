/* eslint-disable max-len */
const Model = require('../../models/');
const User = Model.User;
const BookBorrowings = Model.BookBorrowings;
const Book = Model.Book;
const BookRatings = Model.BookRatings;

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name'],
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    console.log('tost');

    if (!req.params.id) {
      return res.status(404).json({message: 'No id at req.param!'});
    };

    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name'],
    });

    if (!user) {
      return res.status(404).json({message: 'User not found!'});
    }

    let pastBooks = await BookRatings.findAll({
      where: {
        UserId: req.params.id,
      },
      attributes: ['score', 'updatedAt'],
      include: {
        model: Book,
        attributes: ['name'],
      },
      order: [['updatedAt', 'DESC']],
    });

    let presentBooks = await BookBorrowings.findAll({
      where: {
        UserId: req.params.id,
        isBorrowed: true,
      },
      attributes: [],
      include: {
        model: Book,
        attributes: ['name'],
      },
    });

    // Remove duplicates (if exist) and keep only the latest score for each book in pastBooks
    const pastBooksMap = new Map();
    pastBooks.forEach((book) => {
      if (!pastBooksMap.has(book.Book.name) || pastBooksMap.get(book.Book.name).updatedAt < book.updatedAt) {
        pastBooksMap.set(book.Book.name, book);
      }
    });
    pastBooks = Array.from(pastBooksMap.values()).map((book) => ({name: book.Book.name, userScore: book.score}));

    // Remove duplicates (if exist) in presentBooks
    const presentBooksMap = new Map();
    presentBooks.forEach((book) => presentBooksMap.set(book.Book.name, book));
    presentBooks = Array.from(presentBooksMap.values()).map((book) => ({name: book.Book.name}));

    const response = {
      id: user.id,
      name: user.name,
      books: {
        past: pastBooks,
        present: presentBooks,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res
          .status(400)
          .json({message: 'Name not found in request body'});
    };

    const users = await User.findAll({
      where: {name: req.body.name},
    });

    if (users && users.length) {
      return res.status(409).json({message: 'User already exist!'});
    };

    await User.create({
      name: req.body.name,
    });

    return res.status(201).json({message: `User is successfully created!`});
  } catch (error) {
    next(error);
  }
};

const borrowBook = async (req, res, next) => {
  try {
    if (!req.params.userId || !req.params.bookId ) {
      return res.status(404).json({message: 'Missing param!'});
    };

    const book = await Book.findAll({
      where: {
        id: req.params.bookId,
      },
      paranoid: false,
    });

    if (!book || !book.length) {
      return res.status(404).json({message: 'Book not found!'});
    };

    const borrow = await BookBorrowings.findAll({
      where: {
        BookId: req.params.bookId,
        isBorrowed: true,
      },
      returning: true,
      plain: true,
    });
    console.log(borrow);

    if (!borrow || !borrow.length && !borrow.dataValues) {
      await BookBorrowings.create({
        UserId: req.params.userId,
        BookId: req.params.bookId,
        isBorrowed: true,
        isReturned: false,
      }, false);

      return res.status(200).json({
        message: 'Book borrowed!',
      });
    } else if (borrow.isReturned === false && borrow.isBorrowed === true) {
      return res.status(400).json({
        message: 'Book is not available!',
      });
    }
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    if (!req.params.userId || !req.params.bookId ) {
      return res.status(404).json({message: 'Missing param!'});
    };

    const book = await Book.findAll({
      where: {
        id: req.params.bookId,
      },
      paranoid: false,
    });

    if (!book || !book.length) {
      return res.status(404).json({message: 'Book not found!'});
    };

    const borrow = await BookBorrowings.findAll({
      where: {
        BookId: req.params.bookId,
        UserId: req.params.userId,
      },
      returning: true,
      plain: true,
    });

    //  //

    if (!borrow || !borrow.length && !borrow.dataValues) {
      return res.status(404).json({
        message: 'No borrow record for this book is found!',
      });
    } else if (borrow.isBorrowed === false) {
      return res.status(404).json({
        message: 'The book is not borrowed yet!',
      });
    } else if (borrow.isBorrowed === true && borrow.isReturned === false) {
      await BookBorrowings.update({
        UserId: req.params.userId,
        isBorrowed: false,
        isReturned: true,
      }, {
        where: {BookId: req.params.bookId},
        returning: true,
      },
      );
      await BookRatings.create({
        UserId: req.params.userId,
        BookId: req.params.bookId,
        score: req.body.score,
      });
      return res.status(200).json({
        message: 'Book returned and gained a new score!',
      });
    };
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  borrowBook,
  returnBook,
};
