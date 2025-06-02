const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Warehouse = sequelize.define('LAOD', {
    Laod_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    aadress: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    telefoninumber: {
        type: Sequelize.STRING(15),
        allowNull: false
    }
}, {
    tableName: 'LAOD',
    timestamps: false
});

module.exports = Warehouse;