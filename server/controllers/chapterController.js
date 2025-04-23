// server/controllers/chapterController.js
const pool = require('../config/db');

exports.completeChapter = async (req, res) => {
  const userId = req.userId;
  const { chapterKey } = req.body;
  if (!chapterKey) {
    return res.status(400).json({ message: "chapterKey es requerido" });
  }

  // Estas constantes definen la recompensa por capítulo
  const rewardCoins = 350;
  const rewardExp   = 800;

  try {
    // 1) Leer el JSON actual de completed_chapters
    const [rows] = await pool.query(
      "SELECT completed_chapters FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const current = rows[0].completed_chapters;
    const completed = current
      ? (typeof current === "string" ? JSON.parse(current) : current)
      : [];

    // 2) Si ya está completado, devolvemos éxito inmediato (sin repetir la recompensa)
    if (completed.includes(chapterKey)) {
      const [updatedRows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      const updatedUser = updatedRows[0];
      updatedUser.completed_chapters = typeof updatedUser.completed_chapters === "string"
        ? JSON.parse(updatedUser.completed_chapters)
        : updatedUser.completed_chapters || [];

      return res.json({
        message: "Capítulo ya completado",
        user: updatedUser
      });
    }

    // 3) Agregar el capítulo al array, y actualizar capítulo + monedas + experiencia
    completed.push(chapterKey);
    await pool.query(
      `UPDATE users 
         SET completed_chapters = ?, 
             coins = coins + ?, 
             experience = experience + ? 
       WHERE id = ?`,
      [JSON.stringify(completed), rewardCoins, rewardExp, userId]
    );

    // 4) Leer de nuevo el usuario actualizado
    const [updatedRows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );
    const updatedUser = updatedRows[0];
    updatedUser.completed_chapters = typeof updatedUser.completed_chapters === "string"
      ? JSON.parse(updatedUser.completed_chapters)
      : updatedUser.completed_chapters || [];

    // 5) Responder con el user actualizado (incluye nuevas monedas y experiencia)
    return res.json({
      message: "Capítulo marcado como completado",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error en completeChapter:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
