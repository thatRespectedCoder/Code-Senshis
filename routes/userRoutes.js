const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get Leaderboard
router.get('/leaderboard', userController.getLeaderboard);

// Get User Profile
router.get('/:id', userController.getUserProfile);

module.exports = router;
