const express = require('express');
const router = express.Router();
const BookModel = require('../models/Book'); // import capital B

// GET /books — render all books for users
router.get('/', async (req, res) => {
  try {
    const books = await BookModel.getAllBooks();
    res.render('books', { books, adminView: req.session?.isAdmin || false  }); // uses views/books.ejs
  } catch (err) {
    console.error('Error loading books:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
