const { Book, Author } = require('../models');

class AuthorController {

    async getAllAuthors(req, res) {
        try {
            const authors = await Author.findAll({
                include: [{model: Book}],
                order: [['nimi', 'ASC']] // Sort authors by name
            });
            res.render('authors', { authors, adminView: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching authors');
        }
    }

    async getOneAuthor(req, res) {
        const id = req.params.id;
        try {
            const author = await Author.findOne({
                where: { Aut_id: id },
                include: [Book]
            });
            if (!author) {
                return res.status(404).send('Author not found');
            }
            res.render('author', { author, adminView: false });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching author details');
        }
    }
}

module.exports = new AuthorController();