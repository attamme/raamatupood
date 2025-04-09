const db = require('../DB/db');

// VIEW all books
async function getAllBooks() {
    const [rows] = await db.query(`
        SELECT 
            r.ISBN_kood, 
            r.pealkiri, 
            a.nimi AS Autor, 
            k.nimi AS Kirjastaja, 
            r.aasta, 
            r.hind, 
            ls.kogus AS Kogus_laos
        FROM RAAMATUD r
        JOIN AUTORID a ON r.Aut_id = a.Aut_id
        JOIN KIRJASTAD k ON r.Kirj_id = k.Kirj_id
        JOIN LAOSEISUD ls ON r.ISBN_kood = ls.ISBN_kood
        ORDER BY r.pealkiri
    `);
    return rows;
}

// INSERT a new book
async function insertBook(data) {
    const { ISBN_kood, pealkiri, aasta, hind, autor_nimi, kirjastaja_nimi, Laod_id, kogus } = data;

    const [authorRows] = await db.query(`SELECT Aut_id FROM AUTORID WHERE nimi = ?`, [autor_nimi]);
    const Aut_id = authorRows.length > 0
    ? authorRows[0].Aut_id
    : (await db.query(
        `INSERT INTO AUTORID (nimi, aadress, kodulehe_url) VALUES (?, ?, ?)`,
        [autor_nimi, data.autor_aadress, data.autor_url]
    ))[0].insertId;

    const [publisherRows] = await db.query(`SELECT Kirj_id FROM KIRJASTAD WHERE nimi = ?`, [kirjastaja_nimi]);
    const Kirj_id = publisherRows.length > 0
        ? publisherRows[0].Kirj_id
        : (await db.query(
            `INSERT INTO KIRJASTAD (nimi, aadress, telefoninumber, kodulehe_url) VALUES (?, ?, ?, ?)`,
            [kirjastaja_nimi, data.kirjastaja_aadress, data.kirjastaja_telefon, data.kirjastaja_url]
        ))[0].insertId;
        

    await db.query(
        `INSERT INTO RAAMATUD (ISBN_kood, pealkiri, hind, aasta, Kirj_id, Aut_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [ISBN_kood, pealkiri, hind, aasta, Kirj_id, Aut_id]
    );

    await db.query(
        `INSERT INTO LAOSEISUD (ISBN_kood, Laod_id, kogus) VALUES (?, ?, ?)`,
        [ISBN_kood, Laod_id, kogus]
    );
}

// UPDATE book info
async function updateBook(ISBN_kood, data) {
    const { pealkiri, hind, aasta } = data;
    await db.query(
        `UPDATE RAAMATUD SET pealkiri = ?, hind = ?, aasta = ? WHERE ISBN_kood = ?`,
        [pealkiri, hind, aasta, ISBN_kood]
    );
}

// DELETE book
async function deleteBook(ISBN_kood) {
    await db.query(`DELETE FROM LAOSEISUD WHERE ISBN_kood = ?`, [ISBN_kood]);
    await db.query(`DELETE FROM RAAMATUD WHERE ISBN_kood = ?`, [ISBN_kood]);
}

module.exports = {
    getAllBooks,
    insertBook,
    updateBook,
    deleteBook
};
