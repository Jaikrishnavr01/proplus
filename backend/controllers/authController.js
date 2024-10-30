const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// User Registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check for email and password presence first
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Fetch the user from the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if user.password is defined before comparing
        if (!user.password) {
            return res.status(500).json({ message: 'User password is not set' });
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check logged-in devices limit
        if (user.loggedInDevices.length >= 3) {
            return res.status(403).json({ message: 'Login limit reached. Only 3 devices can be logged in at once.' });
        }

        // Generate tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const deviceId = uuidv4();

        // Update user info
        user.refreshToken = refreshToken;
        user.loggedInDevices.push({ deviceId, ip: req.ip });
        await user.save();

        // Respond with tokens
        res.json({ accessToken, refreshToken, deviceId });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


// Logout from a specific device
exports.logout = async (req, res) => {
    const { deviceId } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.sendStatus(403);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const deviceIndex = user.loggedInDevices.findIndex(device => device.deviceId === deviceId);

        if (deviceIndex === -1) {
            return res.status(400).json({ message: 'Device not found in logged-in devices' });
        }

        user.loggedInDevices.splice(deviceIndex, 1);
        if (user.loggedInDevices.length === 0) {
            user.refreshToken = null;
        }

        await user.save();
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Logout from all devices
exports.logoutAll = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.sendStatus(403);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        user.loggedInDevices = [];
        user.refreshToken = null;

        await user.save();
        res.json({ message: 'Logged out from all devices successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
