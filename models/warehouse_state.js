const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const WarehouseState = sequelize.define('LAOSEISUD', {
    Lssd_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    kogus: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    ISBN_kood: {
        type: Sequelize.STRING(13),
        allowNull: false,
    },
    Laod_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: 'LAOSEISUD',
    timestamps: false
});

module.exports = WarehouseState;