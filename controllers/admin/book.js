const { Book, Author, Publisher, Warehouse, WarehouseState } = require('../../models');

class AdminController {

    async getAllBooks(req, res) {
        try {
            const books = await Book.findAll({
                include: [{model:Author}, {model:Publisher}, {model:WarehouseState}]
            });
            console.log(JSON.stringify(books, null, 2));
            res.render('admin', { books, adminView: true });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching books');
        }
    }

    async insertBook(req, res) {
        try {
          const autorNimi = req.body.autor_nimi || req.body.autor;
          const kirjastajaNimi = req.body.kirjastaja_nimi || req.body.kirjastaja;
      
          let author = await Author.findOne({ where: { nimi: autorNimi } });
          if (!author) {
            console.log('Creating new author:', autorNimi);
            author = await Author.create({
              nimi: autorNimi,
              aadress: req.body.autor_aadress || '',
              kodulehe_url: req.body.autor_url || ''
            });
          }
      
          let publisher = await Publisher.findOne({ where: { nimi: kirjastajaNimi } });
          if (!publisher) {
            console.log('Creating new publisher:', kirjastajaNimi);
            publisher = await Publisher.create({
              nimi: kirjastajaNimi,
              aadress: req.body.kirjastaja_aadress || '',
              telefoninumber: req.body.kirjastaja_telefon || '',
              kodulehe_url: req.body.kirjastaja_url || ''
            });
          }
      
          const bookData = {
            ...req.body,
            Kirj_id: publisher.Kirj_id,
            Aut_id: author.Aut_id,
          };
      
          delete bookData.autor;
          delete bookData.autor_nimi;
          delete bookData.kirjastaja;
          delete bookData.kirjastaja_nimi;
          delete bookData.autor_aadress;
          delete bookData.autor_url;
          delete bookData.kirjastaja_aadress;
          delete bookData.kirjastaja_telefon;
          delete bookData.kirjastaja_url;
      
          await Book.create(bookData);
          
          // After creating a book
          await WarehouseState.create({
            ISBN_kood: bookData.ISBN_kood,
            Laod_id: req.body.Laod_id,
            kogus: req.body.kogus
          });
      
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
      
          const autorNimi = req.body.autor_nimi || req.body.autor;
          const kirjastajaNimi = req.body.kirjastaja_nimi || req.body.kirjastaja;
      
          if (!autorNimi || autorNimi.trim() === '') {
            return res.status(400).send('Author name is required');
          }
          if (!kirjastajaNimi || kirjastajaNimi.trim() === '') {
            return res.status(400).send('Publisher name is required');
          }
      
          let author = await Author.findOne({ where: { nimi: autorNimi } });
          if (!author) {
            author = await Author.create({
              nimi: autorNimi,
              aadress: req.body.autor_aadress || '',
              kodulehe_url: req.body.autor_url || ''
            });
          }
      
          let publisher = await Publisher.findOne({ where: { nimi: kirjastajaNimi } });
          if (!publisher) {
            publisher = await Publisher.create({
              nimi: kirjastajaNimi,
              aadress: req.body.kirjastaja_aadress || '',
              telefoninumber: req.body.kirjastaja_telefon || '',
              kodulehe_url: req.body.kirjastaja_url || ''
            });
          }
      
          const bookData = {
            ...req.body,
            Kirj_id: publisher.kirj_id,
            Aut_id: author.aut_id,
          };
      
          delete bookData.autor;
          delete bookData.autor_nimi;
          delete bookData.kirjastaja;
          delete bookData.kirjastaja_nimi;
          delete bookData.autor_aadress;
          delete bookData.autor_url;
          delete bookData.kirjastaja_aadress;
          delete bookData.kirjastaja_telefon;
          delete bookData.kirjastaja_url;
      
          await Book.update(bookData, { where: { ISBN_kood: isbn } });
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