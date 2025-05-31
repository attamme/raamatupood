const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Book = sequelize.define('RAAMATUD', {
    ISBN_kood: {
        type: Sequelize.STRING(13),
        allowNull: false,
        primaryKey: true
    },
    pealkiri: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    aasta: {
        type: Sequelize.INTEGER
    },
    hind: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false
    },
    Kirj_id: {
        type: Sequelize.INTEGER.UNSIGNED
    },
    Aut_id: {
        type: Sequelize.INTEGER.UNSIGNED
    }
}, {
    tableName: 'RAAMATUD',
    timestamps: false
});

module.exports = Book;
