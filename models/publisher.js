const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Publisher = sequelize.define('KIRJASTAD', {
    Kirj_id: {
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
    telefoninumber: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    kodulehe_url: {
        type: Sequelize.STRING(150),
    }
}, {
    tableName: 'KIRJASTAD',
    timestamps: false
})

module.exports = Publisher;