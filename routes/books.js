const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book'); 

router.get('/', bookController.getAllBooks);
router.get('/:isbn', bookController.getOneBook);


module.exports = router;
