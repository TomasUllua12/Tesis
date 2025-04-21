import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import "./Retroalimentacion1.css";

export default function Retroalimentacion1() {
  const location = useLocation();
  const { history = [] } = location.state || {};

  // 1) Estado para tu texto personalizado:
  const [customText] = useState(
    "Este es el texto personalizado que quiero que use la IA para generar el feedback."
  );

  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const resp = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            story: customText,
            decisions: history.map((d) => ({
              texto: d.texto,
              descripcion: d.descripcion,
            })),
          }),
        });
        if (!resp.ok) throw new Error();
        const { feedback } = await resp.json();
        setFeedback(feedback);
      } catch {
        setError("No se pudo generar la retroalimentación.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, [history, customText]);

  if (isLoading) return <LoadingScreen setIsLoading={setIsLoading} />;

  return (
    <div className="retroalimentacion-view">
      <h2>La familia Torres y sus hábitos financieros</h2>

      <div className="cap-loading-desafio-progress-bar">
        <div
          className="cap-loading-desafio-progress-fill"
          style={{ width: `100%` }}
        ></div>
      </div>

      <h3 className="cap-completado">¡Capítulo completado!</h3>

      <div className="retro-box">
        <div className="cuadro-desiciones">
          <div className="historial-decisiones">
            <h3>Desiciones seleccionadas:</h3>
            <ul>
              {history.map((d, i) => (
                <li key={i}>
                  <strong>{d.texto}</strong>: {d.descripcion}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cuadro-recompensas">
          <h3>Recompensas</h3>
          <p>EXP: </p> {/* Aca va la cantidad de EXP ganada */ }
          <p>Monedas: </p> {/* Aca va la cantidad de Monedas ganadas */ }
        </div>
      </div>

      <div className="feedback-ai">
        <h3>Feedback personalizado</h3>
        {error ? <p className="error">{error}</p> : <p>{feedback}</p>}
      </div>

      <div className="cap-pieview">
        <Link to="/Aprender/Etapa1">Entendido</Link>
      </div>
    </div>
  );
}
