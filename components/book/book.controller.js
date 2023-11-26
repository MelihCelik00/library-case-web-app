const Model = require('../../models/');
const Book = Model.Book;
const BookRatings = Model.BookRatings;

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: ['id', 'name'],
    });

    if (!books.length) {
      return res.status(404).json({message: 'Not found any book!'});
    };

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({message: 'No id at req.param!'});
    };

    const book = await Book.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name'],
    });

    if (!book || !book.length) {
      return res.status(404).json({message: 'Book not found!'});
    };

    const bookRatings = await BookRatings.findAll({
      where: {
        BookId: req.params.id,
      },
      attributes: ['score'],
    });

    let score;
    if (!bookRatings || !bookRatings.length) {
      score = -1;
    } else {
      const ratings = bookRatings.map((rating) => rating.score);
      score = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
    }

    const response = {
      id: book[0].id,
      name: book[0].name,
      score: score,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res
          .status(400)
          .json({message: 'Name not found in request body'});
    };

    const books = await Book.findAll({
      where: {
        name: req.body.name,
      },
    });

    if (books & books.length) {
      return res.status(409).json({message: 'Book already exist!'});
    };

    await Book.create({
      name: req.body.name,
    });

    return res.status(201).json({message: 'Book is successfully created!'});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};
