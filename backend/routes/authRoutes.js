const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // للمستخدم فقط
router.post('/login', login);       // للأدمن والمستخدم

module.exports = router;
