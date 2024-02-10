const Event = require('../models/Event');

// Create Event
exports.createEvent = async (req, res) => {
    try {
        const { name, date, venue, description, capacity } = req.body;
        const event = new Event({ name, date, venue, description, capacity });
        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register Attendee
exports.registerAttendee = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId, role, specialRequirements } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.attendees.length >= event.capacity) {
            return res.status(400).json({ message: 'Event is already full' });
        }
        const existingAttendee = event.attendees.find(attendee => attendee.userId === userId);
        if (existingAttendee) {
            return res.status(400).json({ message: 'User is already registered for this event' });
        }
        event.attendees.push({ userId, status: 'pending', role, specialRequirements });
        await event.save();
        res.status(200).json({ message: 'Attendee registered successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Confirm Attendance
exports.confirmAttendance = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.body.userId;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const attendee = event.attendees.find(attendee => attendee.userId === userId);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }
        if (attendee.status === 'confirmed') {
            return res.status(400).json({ message: 'User is already confirmed for this event' });
        }
        attendee.status = 'confirmed';
        await event.save();
        res.status(200).json({ message: 'Attendance confirmed successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel Attendance
exports.cancelAttendance = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.body.userId;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const attendee = event.attendees.find(attendee => attendee.userId === userId);
        if (!attendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }
        if (attendee.status === 'canceled') {
            return res.status(400).json({ message: 'User is already canceled for this event' });
        }
        // Implement cancellation logic based on cancellation policy, if needed
        attendee.status = 'canceled';
        await event.save();
        res.status(200).json({ message: 'Attendance canceled successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Event
exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const eventData = req.body;
        const event = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add Comment to Event
exports.addComment = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { comment } = req.body;
        const event = await Event.findByIdAndUpdate(eventId, { $push: { comments: comment } }, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Comment added successfully', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Recommended Events for User
exports.getRecommendedEvents = async (req, res) => {
    try {
        // Implementation of get recommended events logic
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

