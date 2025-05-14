// server/controllers/authController.js
// ==============================================
// Controlador para manejar la lógica de autenticación de usuarios.
// ==============================================

const pool  = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// ==============================================
// Función: register
// Descripción: Registra un nuevo usuario en la base de datos.
// ==============================================
exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // 1) Verificar si el email ya existe
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    // 2) Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3) Insertar usuario (coins y experience toman valores por defecto)
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );
    const userId = result.insertId;

    // 4) Obtener datos completos del nuevo usuario
    const [[newUser]] = await pool.query(
      'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
      [userId]
    );

    // 5) Generar token JWT (1 día)
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 6) Responder con token y datos esenciales del usuario
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
    // 1) Buscar usuario por email
    const [rows] = await pool.query(
      'SELECT id, nombre, email, password, coins, experience FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const user = rows[0];

    // 2) Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // 3) Generar token JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4) Leer mejoras compradas desde la tabla relacional
    const [impRows] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [user.id]
    );
    const purchasedImprovements = impRows.map(r => r.improvement_key);

    // 5) Responder con token y datos del usuario
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

// ==============================================
// Función: me
// Descripción: Devuelve el perfil completo del usuario autenticado.
// ==============================================
exports.me = async (req, res) => {
  try {
    // 1) Leer datos básicos del usuario
    const [rows] = await pool.query(
      'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const user = rows[0];

    // 2) Leer mejoras compradas
    const [impRows] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [req.userId]
    );
    user.purchased_improvements = impRows.map(r => r.improvement_key);

    // 3) Leer capítulos completados
    const [chapRows] = await pool.query(
      'SELECT chapter_key FROM user_completed_chapters WHERE user_id = ?',
      [req.userId]
    );
    user.completed_chapters = chapRows.map(r => r.chapter_key);

    // 4) Leer medallas obtenidas
    const [medRows] = await pool.query(
      'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
      [req.userId]
    );
    user.earned_medals = medRows.map(r => r.medal_key);

    // 5) Enviar perfil completo
    return res.status(200).json({ user });

  } catch (error) {
    console.error('Error en me:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};
