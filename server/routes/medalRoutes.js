// server/routes/medalRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const medalController = require('../controllers/medalController');

// POST /api/claim-medal
router.post(
  '/claim-medal',
  authMiddleware,
  medalController.claimMedal
);

module.exports = router;
