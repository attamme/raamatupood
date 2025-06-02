const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Book = require('../models/book');

class CartController {

    async getOrCreateCart(req) {
        // if user is logged in
        if (req.session.customerId) {
            let cart = await Cart.findOne({
                where: { klnt_id: req.session.customerId }
            });
            if (!cart) {
                // Create a new cart if it doesn't exist
                cart = await Cart.create({ klnt_id: req.session.customerId, koguhind: 0 });
            }
            return cart.Ost_krvd_id; // Return the cart ID
        } else {
            // gues mode
            if (!req.session.cartId) {
                // Create a new cart for guest user
                const cart = await Cart.create({ klnt_id: null, koguhind: 0 });
                req.session.cartId = cart.Ost_krvd_id; // Store the cart ID in session
            }
            return req.session.cartId; // Return the cart ID for guest user
        }
    }

    async addItemToCart(req, res) {
        const { isbn } = req.body; // ISBN code from the request body
        try {
            const cartId = await this.getOrCreateCart(req);

            let item = await CartItem.findOne({
                where: { ISBN_kood: isbn, Ost_krvd_id: cartId }
            });

            const book = await Book.findOne({
                where: { ISBN_kood: isbn }
            });
            const pealkiri = book ? book.pealkiri : 'Tundmatu raamat';

            if (item) {
                await item.increment('kogus', { by: 1 });
            } else {
                await CartItem.create({
                    ISBN_kood: isbn,
                    kogus: 1,
                    raamat: pealkiri,
                    Ost_krvd_id: cartId
                });
            }
            res.redirect('/books'); // Redirect to the books page
            console.log('Item added to cart:', isbn);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getCartItems(req, res) {
        try {
            const cartId = await this.getOrCreateCart(req);
            const cartItemsRaw = await CartItem.findAll({
                where: { Ost_krvd_id: cartId },
                include: [{ model: Book, attributes: ['pealkiri', 'hind'] }] // Include book title
            });

            console.log(cartItemsRaw.map(item => item.toJSON()));
            const cartItems = cartItemsRaw.map(item => ({
                pealkiri: item.raamat,
                kogus: item.kogus,
                hind: item.RAAMATUD ? Number(item.RAAMATUD.hind) : 0, // Use book's price if available
            }))

            const total = cartItems.reduce((sum, item) => sum + (item.kogus * item.hind), 0);
            res.render('cart', { cartItems, total: total.toFixed(2), adminView: false });
            console.log('Cart items retrieved:', cartItems);
        } catch (error) {
            console.error('Error getting cart items:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async removeItemFromCart(req, res) {
        const { isbn } = req.body; // ISBN code from the request body
        try {
            const cartId = await this.getOrCreateCart(req);
            await CartItem.destroy({
                where: { ISBN_kood: isbn, Ost_krvd_id: cartId }
            });
            res.redirect('/cart'); // Redirect to the cart page
            console.log('Item removed from cart:', isbn);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new CartController();