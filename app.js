const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/event_management_system';
const cache = new NodeCache();

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');

    // Create a change stream to listen for write operations
    const eventChangeStream = db.collection('events').watch();
    eventChangeStream.on('change', (change) => {
        console.log('Change detected:', change);

        // If a write operation occurred, flush the cache
        if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
            cache.flushAll(); // Flush all cached data
            console.log('Cache flushed due to write operation in the events collection');
        }
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
