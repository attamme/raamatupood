const express = require('express');
const router = express.Router();
const db = require('../DB/db');

// GET /popular-authors
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT AUTORID.nimi AS autor_nimi, COUNT(RAAMATUD.Aut_id) AS raamatute_arv
            FROM RAAMATUD
            JOIN AUTORID ON RAAMATUD.Aut_id = AUTORID.Aut_id
            GROUP BY RAAMATUD.Aut_id
            ORDER BY raamatute_arv DESC
            LIMIT 10
        `);

        res.render('autor', { authors: results });
    } catch (err) {
        console.error('Viga autorite päringus:', err);
        res.status(500).send('Serveri viga');
    }
});

module.exports = router;
