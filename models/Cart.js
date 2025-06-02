const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Cart = sequelize.define('OSTUKORVID', {
    Ost_krvd_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    koguhind: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
    },
    klnt_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
    }
}, {
    tableName: 'OSTUKORVID',
    timestamps: false
});

module.exports = Cart;