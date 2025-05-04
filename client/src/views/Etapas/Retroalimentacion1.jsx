// Client/views/Retroalimentacion1.jsx
import React, { useState, useEffect, useRef } from "react";               // ←–– agregamos useRef
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { completeChapter } from "../../../services/chapterService";
import "./Retroalimentacion1.css";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";             // ←–– importamos el hook

export default function Retroalimentacion1() {
  const location = useLocation();
  const navigate = useNavigate();
  const { history = [] } = location.state || {};

  // Recompensas
  const rewardCoins = 350;
  const rewardExp   = 800;

  const [customText] = useState(
    "Este es el texto personalizado que quiero que use la IA para generar el feedback. Comienza tus respuestas con HOLA LOCO!"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // ←–– START: Configuración de Text-to-Speech para feedback
  const feedbackRef = useRef(null);                                       // ←–– referencia al párrafo de feedback
  useTextToSpeech(() => feedbackRef.current?.innerText || "");            // ←–– solo lee lo que haya en feedbackRef
  // ←–– END: Configuración de Text-to-Speech

  // 1) Pedir feedback a la IA
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

  // 2) Al pulsar "Entendido", marcamos capítulo y navegamos
  const handleEntendido = async () => {
    setSaving(true);
    setError(null);
    try {
      await completeChapter("capitulo1");
    } catch (err) {
      console.warn("No se pudo completar capítulo:", err);
    } finally {
      navigate("/Aprender/Etapa1");
    }
  };

  return (
    <div className="retroalimentacion-view">
      <h2>La familia Torres y sus hábitos financieros</h2>

      <div className="cap-loading-desafio-progress-bar">
        <div
          className="cap-loading-desafio-progress-fill"
          style={{ width: "100%" }}
        />
      </div>

      <h3 className="cap-completado">¡Capítulo completado!</h3>

      <div className="retro-box">
        <div className="cuadro-desiciones">
          <h3>Decisiones seleccionadas:</h3>
          <ul>
            {history.map((d, i) => (
              <li key={i}>
                <strong>{d.texto}</strong>: {d.descripcion}
              </li>
            ))}
          </ul>
        </div>
        <div className="cuadro-recompensas">
          <h3>Recompensas</h3>
          <p><span className="recomp-exp-text">Exp</span> {rewardExp}</p>
          <p><span>
            <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
          </span>{rewardCoins}</p>
          <br />
          <p className="recompensas-aclaracion">Estas recompensas solo se reciben 1 vez</p>
        </div>
      </div>

      <div className="feedback-ai">
        <h3>Feedback personalizado</h3>
        {error ? (
          <p ref={feedbackRef} className="error">{error}</p>              // ←–– ref en el párrafo de error
        ) : (
          <p ref={feedbackRef}>{feedback}</p>                             // ←–– ref en el párrafo de feedback
        )}
      </div>

      <div className="cap-pieview">
        <button
          className="btn-entendido"
          onClick={handleEntendido}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Entendido"}
        </button>
      </div>
    </div>
  );
}
