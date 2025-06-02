const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const CartItem = sequelize.define('OSTUKORVI_READ', {
    Ost_read_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    ISBN_kood: {
        type: Sequelize.STRING(13),
        allowNull: false
    },
    kogus: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
    },
    raamat: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    Ost_krvd_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: 'OSTUKORVI_READ',
    timestamps: false
})

module.exports = CartItem;