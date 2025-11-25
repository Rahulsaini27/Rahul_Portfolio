const express = require('express');
const router = express.Router();
const { login, loadUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// @route   POST api/auth/login
router.post('/login', login);

// @route   GET api/auth/user
router.get('/user', auth, loadUser);

module.exports = router;