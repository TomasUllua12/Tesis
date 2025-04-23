// server/routes/chapterRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const chapterController = require('../controllers/chapterController');

// POST /api/complete-chapter
router.post(
  '/complete-chapter',
  authMiddleware,
  chapterController.completeChapter
);

module.exports = router;
