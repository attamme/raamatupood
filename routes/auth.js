const express = require('express');
const router = express.Router();

router.post('/login', async(req, res) => {
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

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
    res.redirect('/');
    });
})

module.exports = router;
