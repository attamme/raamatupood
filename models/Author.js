const db = require('../DB/db');

// VIEW all authors
async function getAllAuthors() {
    const [rows] = await db.query(`SELECT * FROM AUTORID`);
    return rows;
}

// view author books
async function getAuthorBooks(autorId) {
    const [rows] = await db.query(`
        SELECT r.pealkiri, r.aasta, r.hind
        FROM RAAMATUD r
        JOIN AUTORID a ON r.Aut_id = a.Aut_id
        WHERE a.Aut_id = ?
    `, [autorId]);
    return rows;
}

module.exports = {
    getAllAuthors,
    getAuthorBooks
};