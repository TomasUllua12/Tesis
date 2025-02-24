// FeedbackScreen.jsx
import React from "react";

export default function FeedbackScreen({ history, node }) {
  return (
    <div className="feedback-screen">
      <h2>Retroalimentación</h2>
      <div className="contenido-feedback">
        {node.contenido}
      </div>
      <div className="historial-decisiones">
        <h3>Tus decisiones:</h3>
        <ul>
          {history.map((decision, index) => (
            <li key={index}>
              <strong>{decision.texto}:</strong> {decision.descripcion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
