// ==============================================
// Archivo: server/index.js
// Descripción: Punto de entrada principal del servidor Express.
// Se encarga de cargar configuraciones, inicializar middlewares,
// registrar rutas y levantar el servidor.
// ==============================================



// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

// Importar dependencias principales
const express = require('express');
const cors = require('cors');

// Importar rutas definidas en la carpeta 'routes'
const authRoutes = require('./routes/authRoutes');
const improvementRoutes = require('./routes/improvementRoutes');
const feedbackRoutes = require('./routes/feedback');
const chapterRoutes = require('./routes/chapterRoutes');

// Crear instancia de la aplicación Express
const app = express();

// Definir el puerto de escucha (por defecto 5000 si no está definido en .env)
const PORT = process.env.PORT || 5000;

// ============================
// Middleware Global
// ============================

// Habilita el parseo de JSON en las peticiones (req.body)
app.use(express.json());

// Permite solicitudes desde otros orígenes (CORS)
app.use(cors());

// ============================
// Rutas de la API
// ============================

// Agrupar todas las rutas bajo el prefijo '/api'
// Maneja registro y login de usuarios
app.use('/api', authRoutes);

// Maneja compra de mejoras
app.use('/api', improvementRoutes);

// Monta todas las rutas de feedback bajo /api/feedback
app.use("/api/feedback", feedbackRoutes);

app.use('/api', chapterRoutes);

// ============================
// Ruta base (para prueba rápida)
// ============================

app.get('/', (req, res) => {
  res.send('Listening...');
});

// ============================
// Inicializar el servidor
// ============================

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
