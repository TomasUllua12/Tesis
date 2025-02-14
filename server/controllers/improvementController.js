// server/controllers/improvementController.js
const pool = require('../config/db');

exports.buyImprovement = async (req, res) => {
  const userId = req.userId; // Obtenido desde el middleware de autenticación
  const { improvementKey, price } = req.body;
  
  if (!improvementKey || !price) {
    return res.status(400).json({ message: "Datos incompletos" });
  }
  
  try {
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
      purchasedImprovements = typeof user.purchased_improvements === "string"
        ? JSON.parse(user.purchased_improvements)
        : user.purchased_improvements;
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
      updatedUser.purchased_improvements = typeof updatedUser.purchased_improvements === "string"
        ? JSON.parse(updatedUser.purchased_improvements)
        : updatedUser.purchased_improvements;
    } else {
      updatedUser.purchased_improvements = [];
    }
    return res.json({ message: "Mejora adquirida", user: updatedUser });
  } catch (error) {
    console.error("Error en buyImprovement:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
