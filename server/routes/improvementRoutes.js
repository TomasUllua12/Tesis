// ===================================================
// Archivo: server/routes/improvementRoutes.js
// Descripción: Define la ruta protegida para que un usuario pueda
// comprar una mejora dentro de la plataforma.
// ===================================================

const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la lógica de compra de mejoras
const improvementController = require('../controllers/improvementController');

// Importar middleware de autenticación para proteger la ruta
const authMiddleware = require('../middlewares/authMiddleware');

// =============================
// Rutas protegidas para mejoras
// =============================

// Ruta para comprar una mejora
// Método: POST
// Endpoint: /api/buy-improvement
// Requiere token válido para poder ejecutarse
router.post('/buy-improvement', authMiddleware, improvementController.buyImprovement);

// Exportar el router para ser usado en el servidor principal
module.exports = router;
