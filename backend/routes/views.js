const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',{});
}) 

router.get('/auth', (req, res) => {
    res.render('auth',{});
}) 
router.get('/contact', (req, res) => {
    res.render('contact',{});
});
router.get('/liste', (req, res) => {
    res.render('liste',{});
});
router.get('/cours', (req, res) => {
    res.render('cours',{});
});

// export des routes vers app.js
module.exports = router;

