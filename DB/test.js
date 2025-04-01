const db = require('./DB/db');

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.send(`DB says 1 + 1 = ${rows[0].result}`);
  } catch (err) {
    res.status(500).send('DB error: ' + err.message);
  }
});
