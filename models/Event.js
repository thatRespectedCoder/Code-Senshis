const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['confirmed', 'pending', 'canceled'], default: 'pending' },
    role: String,
    specialRequirements: String
});

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    description: String,
    capacity: { type: Number, default: 100 }, // Capacity limit for the event
    attendees: [attendeeSchema]
});

module.exports = mongoose.model('Event', eventSchema);
