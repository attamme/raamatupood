require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// const dbTestRoute = require('./config/test');
const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const booksRoutes = require('./routes/books');
const cartRoutes = require('./routes/cart');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layout')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressLayouts)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// app.use('/db',dbTestRoute);
app.use('/admin', adminRoutes)
app.use(authRoutes);
app.use(pagesRoutes);
app.use('/books', booksRoutes);
app.use('/cart', cartRoutes)

const sequelize = require('./config/db');
sequelize.sync()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const popularAuthorsRouter = require('./routes/autor');
app.use('/autor', popularAuthorsRouter);

// const mysql = require('mysql2')

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