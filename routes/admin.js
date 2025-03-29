const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../DB/db')

// view data
router.get('/books', (req, res) => {
    const query = ```SELECT ISBN_kood, pealkiri, a.nimi AS Autor, k.nimi AS Kirjastaja, aasta, hind, ls.kogus AS Kogus_laos 
                    FROM RAAMATUD
                    JOIN KIRJASTAJAD k USING (Kirj_id)
                    JOIN AUTORID a USING (Aut_id)
                    JOIN LAOSEISUD ls USING (ISBN_kood)
                    ORDER BY pealkiri```
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

// insert data
router.post('/books', async (req, res) => {
    const { ISBN_kood, pealkiri, aasta, hind, autor_nimi, kirjastaja_nimi} = req.body

    try {
        // look up or insert autor
        let Aut_id;
        const [authorRows] = await db.query(`SELECT Aut_id FROM AUTORID WHERE nimi = ?`, [autor_nimi]);
        if (authorRows.length > 0) {
            Aut_id = authorRows[0].Aut_id;
        } else {
            const [insertAuthor] = await db.query(`INSERT INTO AUTORID (nimi) VALUES (?)`, [autor_nimi]);
            Aut_id = insertAuthor.insertId;
        }

        // look up or insert kirjastaja
        let Kirj_id;
        const [publisherRows] = await db.query(`SELECT Kirj_id FROM KIRJASTAJAD WHERE nimi = ?`, [kirjastaja_nimi]);
        if (publisherRows.length > 0) {
            Kirj_id = publisherRows[0].Kirj_id;
        } else {
            const [insertPublisher] = await db.query(`INSERT INTO KIRJASTAJAD (nimi) VALUES (?)`, [kirjastaja_nimi]);
            Kirj_id = insertPublisher.insertId;
        }

        // insert raamatud 
        await db.query(`INSERT INTO RAAMATUD (ISBN_kood, pealkiri, hind, aasta, Kirj_id, Aut_id) VALUES (?, ?, ?, ?, ?)`, [ISBN_kood, pealkiri, hind, aasta, Kirj_id, Aut_id]);

        // insert laoseisud
        await db.query(`INSERT INTO LAOSEISUD (ISBN_kood, Laod_id, kogus) VALUES (?, ?, ?)`, [ISBN_kood, Laod_id, kogus]);

        res.send('Values inserted')
    } catch (err) {
        console.log(err)
        res.status(500).send('Error inserting values')
    }
})

// delete data
router.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;

    db.query("DELETE FROM LAOSEISUD WHERE ISBN_kood = ?", [isbn], (err) => {
        if (err) return res.status(500).send('Error deleting stock');

        db.query("DELETE FROM RAAMATUD WHERE ISBN_kood = ?", [isbn], (err2) => {
            if (err2) return res.status(500).send('Error deleting book');
            res.send('Book deleted successfully');
        });
    });
});

// update data
router.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { pealkiri, hind, aasta } = req.body;

    const query = `
        UPDATE RAAMATUD 
        SET pealkiri = ?, hind = ?, aasta = ?
        WHERE ISBN_kood = ?
    `;

    db.query(query, [pealkiri, hind, aasta, isbn], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating book');
        } else {
            res.send('Book updated successfully');
        }
    });
});

module.exports = router