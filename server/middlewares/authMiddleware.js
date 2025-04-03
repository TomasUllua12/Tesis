// ===================================================
// Archivo: server/middlewares/authMiddleware.js
// Descripción: Middleware de autenticación.
// Verifica que el usuario haya enviado un token válido
// en la cabecera de la petición y lo decodifica.
// ===================================================

const jwt = require('jsonwebtoken');

// Middleware que protege rutas privadas verificando el token JWT
const authMiddleware = (req, res, next) => {
  // Obtener el token desde la cabecera "Authorization"
  // Formato esperado: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  // Si no se envió un token, denegar el acceso
  if (!token) {
    return res.status(401).json({ message: "No se proporcionó token" });
  }

  try {
    // Verificar que el token sea válido usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si es válido, guardar el ID del usuario en la petición para su uso posterior
    req.userId = decoded.id;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    // Si el token es inválido o expiró, denegar el acceso
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Exportar el middleware para usarlo en rutas protegidas
module.exports = authMiddleware;
