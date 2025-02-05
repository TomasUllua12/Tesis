// Server/index.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Crear un pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ruta para registrar usuario
app.post('/api/register', async (req, res) => {
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

    // Insertar nuevo usuario (se utilizarán los valores predeterminados para coins y experience: 0)
    // NOTA: En esta opción no se define un valor DEFAULT para la columna JSON en la BD,
    // por lo que en el INSERT no se incluye purchased_improvements; en este caso, el campo quedará como NULL.
    const [result] = await pool.query(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', 
      [nombre, email, hashedPassword]
    );
    const userId = result.insertId;

    // Obtener el usuario recién insertado para extraer coins y experience
    const [rows2] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    const newUser = rows2[0];

    // Crear token JWT
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({ 
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
    console.error('Error en /api/register:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Ruta para login
app.post('/api/login', async (req, res) => {
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

    // Procesar purchased_improvements solo si es de tipo string
    let purchasedImprovements;
    if (user.purchased_improvements) {
      if (typeof user.purchased_improvements === "string") {
        purchasedImprovements = JSON.parse(user.purchased_improvements);
      } else {
        purchasedImprovements = user.purchased_improvements;
      }
    } else {
      purchasedImprovements = [];
    }

    res.status(200).json({ 
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
    console.error('Error en /api/login:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Endpoint para comprar una mejora
app.post('/api/buy-improvement', async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { improvementKey, price } = req.body;
    if (!improvementKey || !price) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Obtener datos actuales del usuario
    const [rows] = await pool.query(
      "SELECT coins, purchased_improvements FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = rows[0];

    // Procesar purchased_improvements
    let purchasedImprovements;
    if (!user.purchased_improvements) {
      purchasedImprovements = [];
    } else {
      if (typeof user.purchased_improvements === "string") {
        purchasedImprovements = JSON.parse(user.purchased_improvements);
      } else {
        purchasedImprovements = user.purchased_improvements;
      }
    }

    // Verificar que la mejora aún no se haya comprado
    if (purchasedImprovements.includes(improvementKey)) {
      return res.status(400).json({ message: "Mejora ya adquirida" });
    }

    // Verificar que el usuario tenga suficientes monedas
    if (user.coins < price) {
      return res.status(400).json({ message: "No tienes suficientes monedas" });
    }

    // Actualizar: descontar monedas y agregar la mejora
    const newCoins = user.coins - price;
    purchasedImprovements.push(improvementKey);
    const purchasedImprovementsStr = JSON.stringify(purchasedImprovements);

    await pool.query(
      "UPDATE users SET coins = ?, purchased_improvements = ? WHERE id = ?",
      [newCoins, purchasedImprovementsStr, userId]
    );

    // Obtener usuario actualizado
    const [updatedRows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    let updatedUser = updatedRows[0];
    if (updatedUser.purchased_improvements) {
      if (typeof updatedUser.purchased_improvements === "string") {
        updatedUser.purchased_improvements = JSON.parse(updatedUser.purchased_improvements);
      }
    } else {
      updatedUser.purchased_improvements = [];
    }
    return res.json({ message: "Mejora adquirida", user: updatedUser });
  } catch (error) {
    console.error("Error en /api/buy-improvement:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Listening...');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
