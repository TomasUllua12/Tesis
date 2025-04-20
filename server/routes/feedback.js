// routes/feedback.js
const express = require('express');
const { generateFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// POST /api/feedback
router.post('/', generateFeedback);

module.exports = router;
