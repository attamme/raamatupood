const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', {adminView: false}))
// router.get('/books', (req, res) => res.render('books', {adminView: false}))
router.get('/author', (req, res) => res.render('authors', {adminView: false}))
router.get('/contact', (req, res) => res.render('contact', {adminView: false}))
router.post('/contact', async (req, res) => {
    const { nimi, tekst } = req.body;
    res.render('contact', { adminView: false, success: true, nimi})
})
router.get('/login', (req, res) => res.render('login', { adminView: false }))
// router.get('/cart', (req, res) => res.render('cart', { adminView: false }))
router.get('/order', (req, res) => res.render('order', { adminView: false }))
router.post('/order', async (req, res) => {
    res.render('order-success', { adminView: false})
})
router.get('/search', async (req, res) => {
    const { q } = req.query;
    const Book = require('../models/book');
    const results = await Book.findAll({
        where: {
            pealkiri: { [require('sequelize').Op.like]: `%${q}%` }
        },
    })
    res.render('search-results', { adminView: false, results, q });
})

module.exports = router;