const express = require('express');
const passport = require('passport');
const {
    register,
    login,
    logout,
    logoutAll
} = require('../controllers/authController');

const router = express.Router();

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Social Media Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const refreshToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.json({ accessToken, refreshToken });
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const refreshToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.json({ accessToken, refreshToken });
});

// Logout from a specific device
router.post('/logout', logout);

// Logout from all devices
router.post('/logoutAll', logoutAll);

module.exports = router;
