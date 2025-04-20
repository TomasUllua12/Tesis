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
            decisions: history.map(d => ({
              texto: d.texto,
              descripcion: d.descripcion
            }))
          })
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
      <h2>Feedback personalizado</h2>

      <div className="historial-decisiones">
        <h3>Tus decisiones:</h3>
        <ul>
          {history.map((d, i) => (
            <li key={i}>
              <strong>{d.texto}</strong>: {d.descripcion}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-ai">
        <hr />
        {error ? <p className="error">{error}</p> : <p>{feedback}</p>}
        <hr />
      </div>

      <div className="cap-pieview">
        <Link to="/Aprender/Etapa1">Entendido</Link>
      </div>
    </div>
  );
}
