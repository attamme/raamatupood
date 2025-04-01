const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.send(`✅ DB works! 1 + 1 = ${rows[0].result}`);
  } catch (err) {
    console.error('❌ DB error:', err.message);
    res.status(500).send('❌ DB error: ' + err.message);
  }
});

module.exports = router;
