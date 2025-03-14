const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../DB/db')

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

router.post('/books', (req, res) => {
    const { ISBN_kood, pealkiri, autor, hind, kirjastaja, aasta } = req.body
    const query = `INSERT INTO RAAMATUD (ISBN_kood, pealkiri, autor, hind, kirjastaja, aasta) 
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    ISBN_kood = VALUES(ISBN_kood),
                    autor = VALUES(autor),
                    kirjastaja = VALUES(kirjastaja),`
    db.query = (query, [ISBN_kood, pealkiri, autor, hind, kirjastaja, aasta])
                    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Values inserted')
        }
    })
})

router.delete('/books/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM books WHERE id = ${id}`
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Values deleted')
        }
    })
})

router.put('/books/:id', (req, res) => {
    const id = req.params.id
    const { title, author, price } = req.body
    const query = `UPDATE books SET title = '${title}', author = '${author}', price = '${price}' WHERE id = ${id}`
    db.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('Values updated')
        }
    })
})
module.exports = router