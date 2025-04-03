// ==============================================
// Archivo: server/config/db.js
// Descripción: Configuración de conexión a la base de datos MySQL
// utilizando un pool de conexiones con la librería mysql2/promise.
// ==============================================

// Importar el módulo mysql2 en su versión con soporte de promesas
const mysql = require('mysql2/promise');

// Crear un pool de conexiones para manejar múltiples accesos a la base de datos
const pool = mysql.createPool({
  // Dirección del host de la base de datos (por defecto: localhost)
  host: process.env.DB_HOST || 'localhost',

  // Credenciales de acceso (definidas en el archivo .env)
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  // Configuración del pool
  waitForConnections: true,     // Espera si no hay conexiones disponibles
  connectionLimit: 10,          // Límite máximo de conexiones simultáneas
  queueLimit: 0                 // 0 significa sin límite para la cola de espera
});

// Exportar el pool para poder usarlo en otras partes del servidor
module.exports = pool;
