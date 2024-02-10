const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ;

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
    // Clear cache when major changes occur in the database
    db.on('major-change', () => {
        cache.flushAll(); // Flush all cached data
        console.log('Cache flushed due to major change in database');
    });
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
