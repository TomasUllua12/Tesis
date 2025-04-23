// server/controllers/authController.js
// ==============================================
// Archivo: server/controllers/authController.js
// Descripción: Controlador para manejar la lógica de autenticación de usuarios.
// Incluye funciones para registrar, loguear y obtener el perfil.
// ==============================================

const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==============================================
// Función: register
// Descripción: Registra un nuevo usuario en la base de datos.
// ==============================================
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el email ya existe
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario (coins y experience toman valores por defecto en la tabla)
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );
    const userId = result.insertId;

    // Obtener datos completos del nuevo usuario
    const [rows2] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const newUser = rows2[0];

    // Generar token JWT (1 día)
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Responder con token y datos del usuario
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        coins: newUser.coins,
        experience: newUser.experience
      }
    });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// ==============================================
// Función: login
// Descripción: Inicia sesión de un usuario existente.
// ==============================================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const user = rows[0];

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Parsear mejoras compradas
    let purchasedImprovements = [];
    if (user.purchased_improvements) {
      purchasedImprovements = typeof user.purchased_improvements === 'string'
        ? JSON.parse(user.purchased_improvements)
        : user.purchased_improvements;
    }

    // Responder con token y datos del usuario
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        coins: user.coins,
        experience: user.experience,
        purchased_improvements: purchasedImprovements
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// server/controllers/authController.js
// … (el resto de tu archivo permanece igual)

// ==============================================
// Función: me
// Descripción: Devuelve el perfil completo del usuario autenticado.
// ==============================================
exports.me = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const user = rows[0];

    // —— Aquí la corrección —— 
    // purchased_improvements puede ser String o Array
    let pi = user.purchased_improvements;
    if (pi) {
      pi = typeof pi === 'string' ? JSON.parse(pi) : pi;
    } else {
      pi = [];
    }

    // lo mismo para completed_chapters
    let cc = user.completed_chapters;
    if (cc) {
      cc = typeof cc === 'string' ? JSON.parse(cc) : cc;
    } else {
      cc = [];
    }

    user.purchased_improvements = pi;
    user.completed_chapters    = cc;

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error en me:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

