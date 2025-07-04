const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Author = sequelize.define('AUTORID', {
    Aut_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nimi: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    aadress: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    kodulehe_url: {
        type: Sequelize.STRING(150),
    }
}, {
    tableName: 'AUTORID',
    timestamps: false
})

module.exports = Author;