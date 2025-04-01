const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express deployed via Vercel!');
});

module.exports = app;
