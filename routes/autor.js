const express = require('express');
const router = express.Router();
const AuthorModel = require('../models/Author'); // import capital A

// GET /popular-authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.getAllAuthors();
        const authorBooks = await Promise.all(authors.map(author => AuthorModel.getAuthorBooks(author.Aut_id)));
        const results = authors.map((author, index) => ({
            ...author,
            books: authorBooks[index]
        }));

        res.render('autor', { authors: results, adminView: req.session?.isAdmin || false });
    } catch (err) {
        console.error('Viga autorite päringus:', err);
        res.status(500).send('Serveri viga');
    }
});

module.exports = router;
