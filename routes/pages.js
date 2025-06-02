const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', {adminView: false}))
// router.get('/books', (req, res) => res.render('books', {adminView: false}))
router.get('/author', (req, res) => res.render('authors', {adminView: false}))
router.get('/contact', (req, res) => res.render('contact', {adminView: false}))
router.get('/login', (req, res) => res.render('login', { adminView: false }))
// router.get('/cart', (req, res) => res.render('cart', { adminView: false }))

module.exports = router;