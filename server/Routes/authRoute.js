const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, getUser, logoutUser } = require('../Controllers/authController');

router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user', getUser)
router.get('/logout', logoutUser)

module.exports = router;