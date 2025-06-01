const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // stores data in memory
const AdminController = require('../controllers/admin/book');

router.use((req, res, next) => {
    if (!req.session || !req.session.isAdmin) {
        return res.redirect('/login'); 
    }
    next();
})

router.get('/', (req, res) => AdminController.getAllBooks(req, res));
router.post('/checkAuthorPublisher', (req, res) => AdminController.checkAuthorPublisher(req, res));
router.post('/books', upload.none(), (req, res) => AdminController.insertBook(req, res));
router.post('/books/update/:isbn', (req, res) => AdminController.updateBook(req, res));
router.post('/books/delete/:isbn', (req, res) => AdminController.deleteBook(req, res));

module.exports = router;