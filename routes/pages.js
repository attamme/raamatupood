const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', {adminView: false}))
router.get('/books', (req, res) => res.render('books', {adminView: false}))
router.get('/autor', (req, res) => res.render('autor', {adminView: false}))
router.get('/contact', (req, res) => res.render('contact', {adminView: false}))
router.get('/login', (req, res) => res.render('login', { adminView: false }))

module.exports = router;