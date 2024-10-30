const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('./models/User');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // Correct key
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Correct key
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
        done(null, user);
    } else {
        const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
        });
        await newUser.save();
        done(null, newUser);
    }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
        done(null, user);
    } else {
        const newUser = new User({
            username: profile.username,
            email: profile.emails[0].value,
            provider: 'github',
        });
        await newUser.save();
        done(null, newUser);
    }
}));

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);
