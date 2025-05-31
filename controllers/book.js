const { Book, Author, Publisher } = require('../models');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [Author, Publisher]
        });
        res.render('books', { books, adminView: false });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching books');
    }
}