// server/controllers/chapterController.js
// ==============================================
// Controlador para manejar la lógica de capítulos completados.
// ==============================================

const pool = require('../config/db');

exports.completeChapter = async (req, res) => {
  const userId     = req.userId;
  const { chapterKey } = req.body;

  if (!chapterKey) {
    return res.status(400).json({ message: "chapterKey es requerido" });
  }

  // Recompensas por capítulo
  const rewardCoins = 1050;
  const rewardExp   = 800;

  try {
    // 1) Verificar si ya existe el registro en user_completed_chapters
    const [existRows] = await pool.query(
      'SELECT 1 FROM user_completed_chapters WHERE user_id = ? AND chapter_key = ?',
      [userId, chapterKey]
    );
    if (existRows.length) {
      // Ya completado: leemos el usuario y devolvemos sin recompensar de nuevo
      const [[baseUser]] = await pool.query(
        'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
        [userId]
      );
      const user = { ...baseUser };

      // Mejoras compradas
      const [impRows] = await pool.query(
        'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
        [userId]
      );
      user.purchased_improvements = impRows.map(r => r.improvement_key);

      // Capítulos completados
      const [chapRows] = await pool.query(
        'SELECT chapter_key FROM user_completed_chapters WHERE user_id = ?',
        [userId]
      );
      user.completed_chapters = chapRows.map(r => r.chapter_key);

      // Medallas obtenidas
      const [medRows] = await pool.query(
        'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
        [userId]
      );
      user.earned_medals = medRows.map(r => r.medal_key);

      return res.json({
        message: "Capítulo ya completado",
        user
      });
    }

    // 2) Insertar la nueva fila en user_completed_chapters
    await pool.query(
      'INSERT INTO user_completed_chapters (user_id, chapter_key) VALUES (?, ?)',
      [userId, chapterKey]
    );

    // 3) Actualizar monedas y experiencia en users
    await pool.query(
      'UPDATE users SET coins = coins + ?, experience = experience + ? WHERE id = ?',
      [rewardCoins, rewardExp, userId]
    );

    // 4) Leer usuario actualizado
    const [[baseUser]] = await pool.query(
      'SELECT id, nombre, email, coins, experience FROM users WHERE id = ?',
      [userId]
    );
    const user = { ...baseUser };

    // 5) Rellenar arrays de relaciones

    // 5.1 Mejoras compradas
    const [impRows2] = await pool.query(
      'SELECT improvement_key FROM user_purchased_improvements WHERE user_id = ?',
      [userId]
    );
    user.purchased_improvements = impRows2.map(r => r.improvement_key);

    // 5.2 Capítulos completados
    const [chapRows2] = await pool.query(
      'SELECT chapter_key FROM user_completed_chapters WHERE user_id = ?',
      [userId]
    );
    user.completed_chapters = chapRows2.map(r => r.chapter_key);

    // 5.3 Medallas obtenidas
    const [medRows2] = await pool.query(
      'SELECT medal_key FROM user_earned_medals WHERE user_id = ?',
      [userId]
    );
    user.earned_medals = medRows2.map(r => r.medal_key);

    // 6) Responder con mensaje y usuario actualizado
    return res.json({
      message: "Capítulo marcado como completado",
      user
    });

  } catch (error) {
    console.error("Error en completeChapter:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
