require('dotenv').config();
const Sequelize = require('sequelize');

/* const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
}); -- when connectin to phpmyadmin
 */ 

const sequelize = new Sequelize('raamatupood', 'root', 'qwerty', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize;