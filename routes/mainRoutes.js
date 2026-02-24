const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const user = req.session.user || null;
    res.render('index', { title: 'Welcome to Kami', user });
});

module.exports = router;
