// server/routes/improvementRoutes.js
const express = require('express');
const router = express.Router();
const improvementController = require('../controllers/improvementController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para comprar una mejora
router.post('/buy-improvement', authMiddleware, improvementController.buyImprovement);

module.exports = router;
