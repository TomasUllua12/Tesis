// Capitulo1.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { StoryNode } from "../../components/StoryNode";
import { NarrativeText } from "../../components/NarrativeText";
import storyData from "./cap.json";
import "./Capitulo.css";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startId);
  const [history, setHistory] = useState([]);
  const [showHint, setShowHint] = useState(true); // 👈 Nuevo estado para el cartel

  const navigate = useNavigate();

  // Nodo actual
  const currentNode = storyData.nodes.find((node) => node.id === currentNodeId);

  // Texto a leer por voz (excluye el título)
  const containerRef = useRef(null);
  useTextToSpeech(() => {
    const text = containerRef.current?.innerText || "";
    return text
      .split('\n')
      .filter(line => line.trim() !== "La familia Torres y sus hábitos financieros")
      .join('\n');
  });

  // Redirección si es nodo final
  useEffect(() => {
    if (currentNode && currentNode.type === "final") {
      navigate("/aprender/etapa1/retroalimentacion1", {
        state: { history, node: currentNode },
      });
    }
  }, [currentNode, history, navigate]);

  // Ocultar el cartel después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Avance en la historia
  const handleNext = (nextNodeId, decision = null) => {
    if (decision) setHistory([...history, decision]);
    setCurrentNodeId(nextNodeId);
  };

  if (!currentNode || currentNode.type === "final") return null;

  return (
    <div className="cap-bg">
      {/* Cartel informativo flotante */}
      {showHint && (
        <div
          style={{
            position: "fixed",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 136, 0)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(255, 136, 0, 0.2)",
            fontFamily: 'Kode Mono'
          }}
        >
          Presioná Shift derecho para escuchar el texto en voz alta 🎧
        </div>
      )}

      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <div className="cap-content" ref={containerRef}>
          <h2>La familia Torres y sus hábitos financieros</h2>

          <div className="cap-loading-desafio-progress-bar">
            <div
              className="cap-loading-desafio-progress-fill"
              style={{ width: `100%` }}
            ></div>
          </div>

          <div className="cap-node-image">
            {currentNode.imagen && (
              <img
                key={currentNode.imagen}
                src={currentNode.imagen}
                alt="Imagen del nodo"
              />
            )}
          </div>

          <div className="cap-options">
            {currentNode.type === "texto" ? (
              <NarrativeText node={currentNode} onNext={handleNext} />
            ) : (
              <StoryNode node={currentNode} onDecision={handleNext} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Capitulo1;
