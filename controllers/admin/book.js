const { Book, Author, Publisher } = require('../../models');

class AdminController {

    async getAllBooks(req, res) {
        try {
            const books = await Book.findAll({
                include: [{model:Author}, {model:Publisher}]
            });
            res.render('admin', { books, adminView: true });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching books');
        }
    }

    async insertBook(req, res) {
        try {
            const autorNimi = req.body.autor || req.body.autor_nimi;
            const kirjastajaNimi = req.body.kirjastaja || req.body.kirjastaja_nimi;

            // Check if author exists, if not create it
            let author = await Author.findOne({ where: { nimi: autorNimi } });
            if (!author) {
                author = await Author.create({ nimi: autorNimi });
            }

            // Check if publisher exists, if not create it
            let publisher = await Publisher.findOne({ where: { nimi: kirjastajaNimi } });
            if (!publisher) {
                publisher = await Publisher.create({ nimi: kirjastajaNimi });
            }

            // Prepare book data
            const bookData = {
                ...req.body,
                Kirj_id: publisher.kirj_id,
                Aut_id: author.aut_id
            };

            delete bookData.autor; // Remove the original author name field
            delete bookData.autor_nimi; // Remove the original author name field if it exists
            delete bookData.kirjastaja; // Remove the original publisher name field
            delete bookData.kirjastaja_nimi; // Remove the original publisher name field if it exists

            await Book.create(bookData);
            
            res.redirect('/admin');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error inserting book');
        }
    }

    // check if author/publisher exists
    async checkAuthorPublisher(req, res) {
        const { autor, kirjastaja } = req.body;

        try {
            const authorExists = await Author.findOne({ where: { nimi: autor } });
            const publisherExists = await Publisher.findOne({ where: { nimi: kirjastaja } });

            console.log('🔧 Author exists:', !!authorExists, '| Publisher exists:', !!publisherExists);
            console.log('🔧 Author:', autor, '| Publisher:', kirjastaja);

            res.json({
                autorMissing: !authorExists,
                kirjastajaMissing: !publisherExists
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error checking author/publisher');
        }
    }

    async updateBook(req, res) {
        try {
            const isbn = req.params.isbn;

            const autorNimi = req.body.autor || req.body.autor_nimi;
            const kirjastajaNimi = req.body.kirjastaja || req.body.kirjastaja_nimi;

            // Check if author exists, if not create it
            let author = await Author.findOne({ where: { nimi: autorNimi } });
            if (!author) {
                author = await Author.create({ nimi: autorNimi });
            }

            // Check if publisher exists, if not create it
            let publisher = await Publisher.findOne({ where: { nimi: kirjastajaNimi } });
            if (!publisher) {
                publisher = await Publisher.create({ nimi: kirjastajaNimi });
            }
            // Prepare book data
            const bookData = {
                ...req.body,
                Kirj_id: publisher.kirj_id,
                Aut_id: author.aut_id
            };

            delete bookData.autor; // Remove the original author name field
            delete bookData.autor_nimi; // Remove the original author name field if it exists
            delete bookData.kirjastaja; // Remove the original publisher name field
            delete bookData.kirjastaja_nimi; // Remove the original publisher name field if it exists

            await Book.update(updateData, { where: { ISBN_kood: isbn } });
            res.redirect('/admin');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating book');
        }
    }

    async deleteBook(req, res) {
        try {
            const { isbn } = req.params;
            await Book.destroy({ where: { ISBN_kood: isbn } });
            res.redirect('/admin');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting book');
        }
    }
}

module.exports = new AdminController();