// controllers/feedbackController.js
const openai = require('../config/openai');

async function generateFeedback(req, res) {
  const { story, customText, decisions } = req.body;

  // construye el contexto usando solo customText si viene, o story si no
  const contexto = customText
    ? `${customText}\n\nContexto original:\n${story}`
    : story;

  const prompt = `
Eres un asesor financiero.
Contexto para generar feedback:
${contexto}

Decisiones del usuario:
${decisions.map(d => `- ${d.texto}: ${d.descripcion}`).join("\n")}

Genera un párrafo de retroalimentación que haga referencia tanto al contexto como a las decisiones, y ofrezca consejos prácticos.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un coach financiero." },
        { role: "user", content: prompt }
      ]
    });
    res.json({ feedback: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generando feedback" });
  }
}

module.exports = { generateFeedback };
