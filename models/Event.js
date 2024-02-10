const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true, index: true }, // Index on date field for faster date-based queries
    venue: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    attendees: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
        role: { type: String },
        specialRequirements: { type: String }
    }],
    comments: [{ type: String }],
});

module.exports = mongoose.model('Event', eventSchema);
