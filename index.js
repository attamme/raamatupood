require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts')
const dbTestRoute = require('./DB/test');
require('dotenv').config();
const adminRoutes = require('./routes/admin')
const multer = require('multer');
const upload = multer(); // stores data in memory
const session = require('express-session');
const dbBooksRoute = require('./routes/books')
const db = require('./DB/db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layout')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use('/db',dbTestRoute);
const popularAuthorsRouter = require('./routes/autor');
app.use('/autor', popularAuthorsRouter);
app.use('/admin', adminRoutes)
const booksRoute = require('./routes/books');
app.use('/books', booksRoute);

// const mysql = require('mysql2')

app.get('/', (req, res) => {
    res.render('index', {adminView: false})
})

app.get('/login', (req, res) => {
    res.render('login', { adminView: false })
})

app.post('/login', async(req, res) => {
    const { username, password } = req.body;

    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    // check for admin
    if (username === adminUser && password === adminPass) {
        req.session.isAdmin = true;
        res.redirect('/admin');
        return;
    }

    // check for user
    /* const [rows] = await db.query(`SELECT * FROM KLIENDID WHERE nimi = ? AND parool = ?`, [username, password]);

    if (rows.length > 0) {
        req.session.isCustomer = true;
        req.session.customerId = rows[0].klnt_id;
        return res.redirect('/'); // redirect to home page or any other page
    } */
        res.send('Vale kasutajanimi või parool!');
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
    res.redirect('/');
    });
})

/* app.get('/admin', (req, res) => {
    res.render('admin', { adminView: true })
}) */

/* app.listen(3002, () => {
    console.log('server started at local port 3002')
}) */
/*  ^^ only for local testing ^^ */

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port " + (process.env.PORT || 3000));
  });

module.exports = app; 