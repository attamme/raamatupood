const Book = require('./book');
const Author = require('./author');
const Publisher = require('./publisher');
const Cart = require('./cart');
const CartItem = require('./cart_item');
const Warehouse = require('./warehouse');
const WarehouseState = require('./warehouse_state');

Book.belongsTo(Author, { foreignKey: 'Aut_id'});
Author.hasMany(Book, { foreignKey: 'Aut_id' });

Book.belongsTo(Publisher, { foreignKey: 'Kirj_id'});
Publisher.hasMany(Book, { foreignKey: 'Kirj_id' });

Cart.hasMany(Cart, { foreignKey: 'Ost_krvd_id' });
Cart.belongsTo(Cart, { foreignKey: 'Ost_krvd_id' });

CartItem.belongsTo(Book, { foreignKey: 'ISBN_kood', targetKey: 'ISBN_kood' });
Book.hasMany(CartItem, { foreignKey: 'ISBN_kood', sourceKey: 'ISBN_kood' });

Warehouse.hasMany(WarehouseState, { foreignKey: 'Laod_id' });
WarehouseState.belongsTo(Warehouse, { foreignKey: 'Laod_id' });

Book.hasMany(WarehouseState, { foreignKey: 'ISBN_kood', sourceKey: 'ISBN_kood' });
WarehouseState.belongsTo(Book, { foreignKey: 'ISBN_kood', targetKey: 'ISBN_kood' });

module.exports = {
    Book,
    Author,
    Publisher,
    Cart,
    CartItem,
    Warehouse,
    WarehouseState
};