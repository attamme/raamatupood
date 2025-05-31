const Book = require('./book');
const Author = require('./author');
const Publisher = require('./publisher');

Book.belongsTo(Author, { foreignKey: 'Aut_id' });
Author.hasMany(Book, { foreignKey: 'Aut_id' });

Book.belongsTo(Publisher, { foreignKey: 'Kirj_id' });
Publisher.hasMany(Book, { foreignKey: 'Kirj_id' });

module.exports = {
    Book,
    Author,
    Publisher
};