const db = require('../config/db');

// get or create cart for user
async function getOrCreateCart(klnt_id) {
    const [rows] = await db.query(`
        SELECT Ost_krvd_id FROM OSTUKORVID WHERE klnt_id = ?
    `, [klnt_id]);
    if (rows.length > 0) {
        return rows[0].Ost_krvd_id;
    } else {
        const [result] = await db.query(`
            INSERT INTO OSTUKORVID (koguhind, klnt_id) VALUES (?, ?)
        `, [0, klnt_id]);
        return { id: result.insertId };
    }
}

// add item to cart
async function addItemToCart(klnt_id, ISBN_kood) {
    const cartId = await getOrCreateCart(klnt_id);

    // check if item already exists in cart
    const [existing] = await db.query(`
        SELECT * FROM OSTUKORVI_READ WHERE Ost_read_id = ? AND ISBN_kood = ?
    `, [cartId, ISBN_kood]);
    const [bookRows] = await db.query(`
        SELECT pealkiri FROM RAAMATUD WHERE ISBN_kood = ?
        `, [ISBN_kood]);
    const pealkiri = bookRows[0]?.pealkiri || 'Tundmatu raamat';

    if (existing.length > 0) {
        // update quantity if item already exists
        await db.query(`
            UPDATE OSTUKORVI_READ SET kogus = kogus + 1 WHERE Ost_read_id = ? AND ISBN_kood = ?
        `, [cartId, ISBN_kood]);
    } else {
        // insert new item into cart
        await db.query(`
            INSERT INTO OSTUKORVI_READ (ISBN_kood, kogus, raamat, Ost_krvd_id) VALUES (?, ?, ?, ?)
        `, [ISBN_kood, 1, pealkiri, cartId]);
    }
    return cartId;
}

module.exports = {
    getOrCreateCart,
    addItemToCart
};