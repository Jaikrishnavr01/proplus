const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: String,
    loggedInDevices: [{ deviceId: String, ip: String }],
    provider: { type: String, enum: ['google', 'github'], default: null },
});

module.exports = mongoose.model('User', userSchema);

