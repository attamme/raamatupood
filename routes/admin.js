const express = require('express');
const router = express.Router();
// const Book = require('../models/BookOld');
// const db = require('../config/db');
const multer = require('multer');
const upload = multer(); // stores data in memory

router.use((req, res, next) => {
    // Check if user is logged in
    if (!req.session || !req.session.isAdmin) {
        return res.redirect('/login');
    }
    next();
});


// VIEW
router.get('/', async (req, res) => {
    const books = await Book.getAllBooks();
    res.render('admin', { adminView: true, books });
});

// INSERT
// Check if author/publisher exists
router.post('/check-author-publisher', async (req, res) => {
    const { autor, kirjastaja } = req.body;

    const [authorRows] = await db.query(`SELECT * FROM AUTORID WHERE nimi = ?`, [autor]);
    const [publisherRows] = await db.query(`SELECT * FROM KIRJASTAD WHERE nimi = ?`, [kirjastaja]);

    console.log('🔧 Author exists:', authorRows.length, '| Publisher exists:', publisherRows.length);
    console.log('🔧 Author:', autor, '| Publisher:', kirjastaja);

    res.json({
        autorMissing: authorRows.length === 0,
        kirjastajaMissing: publisherRows.length === 0
    });
});

router.post('/books', upload.none(), async (req, res) => {
    try {
      await Book.insertBook(req.body);
      res.redirect('/admin');
    } catch (err) {
      console.error(err);
      res.status(500).send('Insert failed');
    }
  });
  

// UPDATE
router.post('/books/update/:isbn', async (req, res) => {
    try {
        await Book.updateBook(req.params.isbn, req.body);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Update failed');
    }
});

// DELETE
router.post('/books/delete/:isbn', async (req, res) => {
    try {
        await Book.deleteBook(req.params.isbn);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Delete failed');
    }
});

module.exports = router;
