const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const dbTestRoute = require('./DB/test');
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layout')

app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)
app.use('/db',dbTestRoute);

// const mysql = require('mysql2')

app.get('/', (req, res) => {
    res.render('index', {adminView: false})
    console.log('server started at local')
})

app.get('/login', (req, res) => {
    res.render('login', { adminView: false })
})

app.get('/admin', (req, res) => {
    res.render('admin', { adminView: true })
})

/* app.listen(3002, () => {
    console.log('server started at local port 3002')
}) */
/*  ^^ only for local testing ^^ */

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port " + (process.env.PORT || 3000));
  });


module.exports = app; 