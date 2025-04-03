// ===================================================
// Archivo: server/routes/authRoutes.js
// Descripción: Define las rutas relacionadas a la autenticación de usuarios,
// incluyendo el registro y el inicio de sesión.
// ===================================================

const express = require('express');
const router = express.Router();

// Importar el controlador que maneja la lógica de autenticación
const authController = require('../controllers/authController');

// =============================
// Rutas públicas de autenticación
// =============================

// Ruta para registrar un nuevo usuario
// Método: POST
// Endpoint: /api/register
router.post('/register', authController.register);

// Ruta para iniciar sesión
// Método: POST
// Endpoint: /api/login
router.post('/login', authController.login);

// Exportar el router para usarlo en el archivo principal del servidor
module.exports = router;
