const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
require('./passport-setup'); // Ensure to require the setup file
const cors = require('cors');
const bodyParser = require('body-parser');
const coursesRouter = require('./routes/courses');
const chaptersRouter = require('./routes/chapters');
const topicsRouter = require('./routes/topics');
const discussionsRouter = require('./routes/discussion');

require('dotenv').config();


const app = express();


app.use(cors());
app.use(bodyParser.json());
// Middleware
app.use(express.json());
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRouter);
app.use('/api/chapters', chaptersRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/discussions', discussionsRouter);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
