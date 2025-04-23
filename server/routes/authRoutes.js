// server/routes/authRoutes.js
// ===================================================
// Archivo: server/routes/authRoutes.js
// Descripción: Define las rutas relacionadas a la autenticación de usuarios,
// incluyendo registro, login y perfil.
// ===================================================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login',    authController.login);

// Ruta protegida: obtener perfil del usuario autenticado
router.get('/me', authMiddleware, authController.me);

module.exports = router;
