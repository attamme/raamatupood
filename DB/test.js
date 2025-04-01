// test.js
const db = require('./db');

db.query('SELECT 1 + 1 AS result', (err, results) => {
  if (err) {
    console.error('❌ Query failed:', err.message);
    return;
  }
  console.log('✅ Query success! Result:', results[0].result);
});
setTimeout(() => {
  console.log("⏱ Script finished (timeout reached)");
  process.exit();
}, 5000);

