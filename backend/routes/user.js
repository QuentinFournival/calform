const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// !!! modifier les routes / au front-end
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// export des routes vers app.js
module.exports = router;