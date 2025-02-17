// server/controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    // Verificar si el email ya existe
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está en uso' });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar nuevo usuario (se usan valores por defecto para coins y experience)
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', 
      [nombre, email, hashedPassword]
    );
    const userId = result.insertId;

    // Obtener el usuario recién insertado
    const [rows2] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const newUser = rows2[0];

    // Crear token JWT
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuario por email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const user = rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Procesar purchased_improvements
    let purchasedImprovements;
    if (user.purchased_improvements) {
      purchasedImprovements = typeof user.purchased_improvements === "string" 
        ? JSON.parse(user.purchased_improvements) 
        : user.purchased_improvements;
    } else {
      purchasedImprovements = [];
    }

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
