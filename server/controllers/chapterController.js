// server/controllers/chapterController.js
const pool = require('../config/db');

exports.completeChapter = async (req, res) => {
  const userId = req.userId;                       // viene de authMiddleware
  const { chapterKey } = req.body;                 // p.ej. "capitulo1"
  if (!chapterKey) {
    return res.status(400).json({ message: "chapterKey es requerido" });
  }

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

    // 2) Si ya está completado, devolvemos error
    if (completed.includes(chapterKey)) {
        // Leer user actualizado (opcional, para mantener consistencia con la respuesta normal)
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

    // 3) Agregarlo al array y actualizar
    completed.push(chapterKey);
    await pool.query(
      "UPDATE users SET completed_chapters = ? WHERE id = ?",
      [JSON.stringify(completed), userId]
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

    // 5) Responder con el user actualizado
    return res.json({
      message: "Capítulo marcado como completado",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error en completeChapter:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
