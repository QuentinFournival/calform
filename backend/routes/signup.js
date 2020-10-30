const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// !!! modifier les routes / au front-end
router.post('/', userCtrl.signup);

// export des routes vers app.js
module.exports = router;