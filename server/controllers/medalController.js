// server/controllers/medalController.js
// ==============================================
// Controlador encargado de gestionar el reclamo de medallas por parte del usuario.
// ==============================================

const pool = require('../config/db');

exports.claimMedal = async (req, res) => {
  const userId   = req.userId;
  const { medalKey } = req.body;

  // 0) Validar entrada
  if (!medalKey) {
    return res.status(400).json({ message: "medalKey es requerido" });
  }

  try {
    // 1) Leer medallas ya reclamadas
    const [medRows] = await pool.query(
      'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
      [userId]
    );
    const earnedMedals = medRows.map(r => r.medal_key);

    // 2) Validar duplicado
    if (earnedMedals.includes(medalKey)) {
      return res.json({ message: "Medalla ya reclamada" });
    }

    // 3) Insertar nueva relación
    await pool.query(
      'INSERT INTO user_earned_medals (user_id, medal_key) VALUES (?, ?)',
      [userId, medalKey]
    );

    // 4) Leer datos básicos del usuario
    const [[baseUser]] = await pool.query(
      'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
      [userId]
    );
    const user = { ...baseUser };

    // 5) Rellenar arrays de relaciones

    // 5.1 Mejoras compradas
    const [impRows] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [userId]
    );
    user.purchased_improvements = impRows.map(r => r.improvement_key);

    // 5.2 Capítulos completados
    const [chapRows] = await pool.query(
      'SELECT chapter_key FROM user_completed_chapters WHERE user_id = ?',
      [userId]
    );
    user.completed_chapters = chapRows.map(r => r.chapter_key);

    // 5.3 Medallas obtenidas (incluyendo la nueva)
    const [newMedRows] = await pool.query(
      'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
      [userId]
    );
    user.earned_medals = newMedRows.map(r => r.medal_key);

    // 6) Responder con éxito y usuario actualizado
    return res.json({
      message: "Medalla reclamada con éxito",
      user
    });

  } catch (error) {
    console.error("Error en claimMedal:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
