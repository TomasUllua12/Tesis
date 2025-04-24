// server/controllers/medalController.js
const pool = require('../config/db');

exports.claimMedal = async (req, res) => {
  const userId   = req.userId;
  const { medalKey } = req.body;
  if (!medalKey) {
    return res.status(400).json({ message: "medalKey es requerido" });
  }

  try {
    // 1) Obtener earned_medals actual
    const [rows] = await pool.query(
      "SELECT earned_medals FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let medals = rows[0].earned_medals || [];
    if (typeof medals === 'string') medals = JSON.parse(medals);

    // 2) Si ya la tiene, devolvemos éxito sin duplicar
    if (medals.includes(medalKey)) {
      return res.json({ message: "Medalla ya reclamada" });
    }

    // 3) Agregarla y actualizar
    medals.push(medalKey);
    await pool.query(
      "UPDATE users SET earned_medals = ? WHERE id = ?",
      [JSON.stringify(medals), userId]
    );

    return res.json({ message: "Medalla reclamada con éxito", medalKey });
  } catch (err) {
    console.error("Error en claimMedal:", err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
