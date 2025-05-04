// Capitulo1.jsx
import React, { useState, useEffect, useRef } from "react";                // ←–– agregamos useRef
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { StoryNode } from "../../components/StoryNode";
import { NarrativeText } from "../../components/NarrativeText";
import storyData from "./cap.json";
import "./Capitulo.css";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";              // ←–– importamos el hook

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startId);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Obtenemos el nodo actual
  const currentNode = storyData.nodes.find((node) => node.id === currentNodeId);

  // ←–– START: Configuración de lectura por voz
  const containerRef = useRef(null);                                       // ←–– referencia al contenedor
  useTextToSpeech(() => {
    const text = containerRef.current?.innerText || "";
    // Eliminamos la línea exacta del título antes de devolver el texto
    return text
      .split('\n')
      .filter(line => line.trim() !== "La familia Torres y sus hábitos financieros")
      .join('\n');
  });
  
  // ←–– END: Configuración de lectura por voz

  // Si es nodo final, redirigimos a retroalimentación
  useEffect(() => {
    if (currentNode && currentNode.type === "final") {
      navigate(
        "/aprender/etapa1/retroalimentacion1",
        { state: { history, node: currentNode } }
      );
    }
  }, [currentNode, history, navigate]);

  // Función para avanzar en la historia
  const handleNext = (nextNodeId, decision = null) => {
    if (decision) setHistory([...history, decision]);
    setCurrentNodeId(nextNodeId);
  };

  if (!currentNode || currentNode.type === "final") return null;

  return (
    <div className="cap-bg">
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        // ←–– Aquí añadimos la ref al DIV que engloba TODO el contenido
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
