// =====================================================
// Archivo: server/controllers/improvementController.js
// Descripción: Controlador encargado de gestionar la compra de mejoras por parte del usuario.
// =====================================================

// Importar la conexión a la base de datos
const pool = require('../config/db');

// =====================================================
// Función: buyImprovement
// Descripción: Permite al usuario comprar una mejora si tiene suficientes monedas
// y aún no la ha adquirido. Actualiza los datos en la base de datos y devuelve
// la información del usuario actualizada.
// =====================================================

exports.buyImprovement = async (req, res) => {
  // ID del usuario autenticado (inyectado por el middleware)
  const userId = req.userId;

  // Datos enviados en el cuerpo de la petición
  const { improvementKey, price } = req.body;

  // Validación: asegurarse de que se enviaron los datos requeridos
  if (!improvementKey || !price) {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  try {
    // Obtener monedas y mejoras compradas del usuario actual
    const [rows] = await pool.query(
      "SELECT coins, purchased_improvements FROM users WHERE id = ?",
      [userId]
    );

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Procesar el campo de mejoras compradas (convertir de string a array si es necesario)
    let purchasedImprovements;
    if (!user.purchased_improvements) {
      purchasedImprovements = [];
    } else {
      purchasedImprovements = typeof user.purchased_improvements === "string"
        ? JSON.parse(user.purchased_improvements)
        : user.purchased_improvements;
    }

    // Verificar si la mejora ya fue comprada
    if (purchasedImprovements.includes(improvementKey)) {
      return res.status(400).json({ message: "Mejora ya adquirida" });
    }

    // Verificar si el usuario tiene suficientes monedas para la compra
    if (user.coins < price) {
      return res.status(400).json({ message: "No tienes suficientes monedas" });
    }

    // Calcular el nuevo saldo de monedas y agregar la mejora al array
    const newCoins = user.coins - price;
    purchasedImprovements.push(improvementKey);
    const purchasedImprovementsStr = JSON.stringify(purchasedImprovements); // Guardar como string

    // Actualizar los datos del usuario en la base de datos
    await pool.query(
      "UPDATE users SET coins = ?, purchased_improvements = ? WHERE id = ?",
      [newCoins, purchasedImprovementsStr, userId]
    );

    // Obtener los datos actualizados del usuario para devolverlos en la respuesta
    const [updatedRows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
    let updatedUser = updatedRows[0];

    // Asegurar que las mejoras compradas estén en formato array
    if (updatedUser.purchased_improvements) {
      updatedUser.purchased_improvements = typeof updatedUser.purchased_improvements === "string"
        ? JSON.parse(updatedUser.purchased_improvements)
        : updatedUser.purchased_improvements;
    } else {
      updatedUser.purchased_improvements = [];
    }

    // Devolver respuesta exitosa con los datos del usuario actualizado
    return res.json({ message: "Mejora adquirida", user: updatedUser });

  } catch (error) {
    // Manejo de errores inesperados
    console.error("Error en buyImprovement:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
