// ==============================================
// Archivo: server/controllers/authController.js
// Descripción: Controlador para manejar la lógica de autenticación de usuarios.
// Incluye funciones para registrar nuevos usuarios y loguearlos.
// ==============================================

// Importar conexión a la base de datos
const pool = require('../config/db');

// Librería para encriptar contraseñas
const bcrypt = require('bcryptjs');

// Librería para generar y verificar tokens JWT
const jwt = require('jsonwebtoken');

// ==============================================
// Función: register
// Descripción: Registra un nuevo usuario en la base de datos.
// ==============================================

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el email ya existe en la base de datos
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    // Generar el hash de la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario con valores por defecto para coins y experience
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', 
      [nombre, email, hashedPassword]
    );

    // Obtener el ID del nuevo usuario insertado
    const userId = result.insertId;

    // Recuperar los datos del nuevo usuario para enviarlos en la respuesta
    const [rows2] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const newUser = rows2[0];

    // Generar un token JWT con el ID del usuario, válido por 1 día
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Responder con el token y los datos del nuevo usuario
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
    // Buscar al usuario por su email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Comparar la contraseña ingresada con la almacenada (hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT para el usuario
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Procesar la propiedad 'purchased_improvements'
    let purchasedImprovements;
    if (user.purchased_improvements) {
      purchasedImprovements = typeof user.purchased_improvements === "string" 
        ? JSON.parse(user.purchased_improvements) 
        : user.purchased_improvements;
    } else {
      purchasedImprovements = [];
    }

    // Responder con el token y los datos del usuario
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
