const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/add', (req, res) => cartController.addItemToCart(req, res));
router.get('/', (req, res) => cartController.getCartItems(req, res));
router.post('/update', (req, res) => cartController.updateItemQuantity(req, res));
router.post('/remove', (req, res) => cartController.removeItemFromCart(req, res));

module.exports = router;
