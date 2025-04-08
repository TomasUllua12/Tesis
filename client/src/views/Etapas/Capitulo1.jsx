// Capitulo1.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { StoryNode } from "../../components/StoryNode";
import { NarrativeText } from "../../components/NarrativeText";
import storyData from "./cap.json";
import "./Capitulo.css";

function Capitulo1() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startId);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Obtenemos el nodo actual en base al id
  const currentNode = storyData.nodes.find((node) => node.id === currentNodeId);

  // Si el nodo actual es final, redirigimos a la página de retroalimentación
  useEffect(() => {
    if (currentNode && currentNode.type === "final") {
      navigate("/retroalimentacion1", { state: { history, node: currentNode } });
    }
  }, [currentNode, history, navigate]);

  // Función para avanzar en la historia. Puede recibir o no una decisión
  const handleNext = (nextNodeId, decision = null) => {
    if (decision) {
      setHistory([...history, decision]);
    }
    setCurrentNodeId(nextNodeId);
  };

  // Mientras no se encuentre el nodo o sea final, no renderizamos nada adicional.
  if (!currentNode || currentNode.type === "final") return null;

  return (
    <div className="cap-bg">
      {isLoading ? (
        <LoadingScreen setIsLoading={setIsLoading} />
      ) : (
        <div className="cap-content">
          <h2>María y su Herencia</h2>
          <div className="cap-loading-desafio-progress-bar">
            <div
              className="cap-loading-desafio-progress-fill"
              style={{ width: `100%` }}
            ></div>
          </div>
          {/* Se muestra la imagen correspondiente al nodo actual */}
          <div className="cap-node-image">
            {currentNode.imagen && (
              <img key={currentNode.imagen} src={currentNode.imagen} alt="Imagen del nodo" />
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
