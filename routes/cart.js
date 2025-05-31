const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // import capital C

router.post('/add', async (req, res) => {
    const { isbn } = req.body; // ISBN code from the request body
    const klnt_id = 1 // TEMP Client ID from the session

    try {
        await Cart.addItemToCart(klnt_id, isbn); // Add item to the cart
        res.redirect('/books'); // Redirect to the books page
        console.log('Item added to cart:', isbn);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
