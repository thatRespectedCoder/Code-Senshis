const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Create Event
router.post('/create', eventController.createEvent);

// Register Attendee
router.post('/:id/register', eventController.registerAttendee);

// Confirm Attendance
router.put('/:id/confirm', eventController.confirmAttendance);

// Cancel Attendance
router.put('/:id/cancel', eventController.cancelAttendance);

// Update Event
router.put('/:id', eventController.updateEvent);

// Delete Event
router.delete('/:id', eventController.deleteEvent);

// Add Comment to Event
router.post('/:id/comment', eventController.addComment);

// Get Recommended Events for User
router.get('/recommended', eventController.getRecommendedEvents);

module.exports = router;
