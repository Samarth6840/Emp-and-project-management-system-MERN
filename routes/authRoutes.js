const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: req.flash('error') });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'Invalid password');
            return res.redirect('/login');
        }

        req.session.user = {
            id: user._id.toString(),
            role: user.role
        };

        if (user.role === 'admin') {
            return res.redirect('/admin/projects');
        } else {
            return res.redirect('/user/projects');
        }

    } catch (err) {
        console.error(err);
        req.flash('error', 'Server error');
        res.redirect('/login');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
