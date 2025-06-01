const { Book, Author, Publisher } = require('../models');

class BookController {

    async getAllBooks(req, res) {
        try {
            const books = await Book.findAll({
                include: [{model:Author}, {model:Publisher}]
            });
            res.render('books', { books, adminView: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching books');
        }
    }

    async getOneBook(req, res) {
        const isbn = req.params.isbn;
        try {
            const book = await Book.findOne({
                where: { ISBN_kood: isbn },
                include: [Author, Publisher]
            });
            if (!book) {
                return res.status(404).send('Book not found');
            }
            res.render('book', { book, adminView: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching book details');
        }
    }
}

module.exports = new BookController();