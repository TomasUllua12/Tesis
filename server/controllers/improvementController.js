// server/controllers/improvementController.js
// ==============================================
// Controlador encargado de gestionar la compra de mejoras por parte del usuario.
// ==============================================

const pool = require('../config/db');

exports.buyImprovement = async (req, res) => {
  const userId = req.userId;
  const { improvementKey, price } = req.body;

  // Validación: asegurarse de que vengan los datos
  if (!improvementKey || typeof price !== 'number') {
    return res.status(400).json({ message: "Datos incompletos" });
  }

  try {
    // 1) Leer monedas del usuario
    const [[userRow]] = await pool.query(
      'SELECT coins FROM users WHERE id = ?',
      [userId]
    );
    if (!userRow) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const currentCoins = userRow.coins;

    // 2) Leer mejoras ya compradas
    const [impRows] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [userId]
    );
    const purchasedImprovements = impRows.map(r => r.improvement_key);

    // 3) Validar duplicado y saldo
    if (purchasedImprovements.includes(improvementKey)) {
      return res.status(400).json({ message: "Mejora ya adquirida" });
    }
    if (currentCoins < price) {
      return res.status(400).json({ message: "Monedas insuficientes" });
    }

    // 4) Insertar la relación y descontar monedas
    await pool.query(
      'INSERT INTO user_purchased_improvements (user_id, improvement_key) VALUES (?, ?)',
      [userId, improvementKey]
    );
    await pool.query(
      'UPDATE users SET coins = coins - ? WHERE id = ?',
      [price, userId]
    );

    // 5) Leer usuario actualizado
    const [[baseUser]] = await pool.query(
      'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
      [userId]
    );
    const user = { ...baseUser };

    // 6) Rellenar arrays de relaciones

    // 6.1 Mejoras compradas
    const [newImpRows] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [userId]
    );
    user.purchased_improvements = newImpRows.map(r => r.improvement_key);

    // 6.2 Capítulos completados
    const [chapRows] = await pool.query(
      'SELECT chapter_key FROM user_completed_chapters WHERE user_id = ?',
      [userId]
    );
    user.completed_chapters = chapRows.map(r => r.chapter_key);

    // 6.3 Medallas obtenidas
    const [medRows] = await pool.query(
      'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
      [userId]
    );
    user.earned_medals = medRows.map(r => r.medal_key);

    // 7) Responder con mensaje y usuario actualizado
    return res.json({
      message: "Mejora adquirida",
      user
    });

  } catch (error) {
    console.error("Error en buyImprovement:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
