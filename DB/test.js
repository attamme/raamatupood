router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT 1 + 1 AS result');
      res.send(`✅ DB works! 1 + 1 = ${rows[0].result}`);
    } catch (err) {
      console.error('❌ DB error:', {
        message: err.message,
        code: err.code,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
        stack: err.stack
      });
  
      res.status(500).json({
        message: err.message,
        code: err.code,
        errno: err.errno,
        sqlMessage: err.sqlMessage
      });
    }
  });
  