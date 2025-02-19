const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

const mysql = require('mysql2')

app.get('/', (req, res) => {
    res.render('index')
    console.log('server started at local')
})

app.listen(3002)