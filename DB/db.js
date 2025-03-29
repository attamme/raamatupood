// db.js
const mysql = require('mysql2');

require('dotenv').config();

const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = db;
console.log("⏳ Connecting to database...");

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to the database!');
});

module.exports = connection;
