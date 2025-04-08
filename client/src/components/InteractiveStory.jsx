// InteractiveStory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoryNode } from "./StoryNode";
import { NarrativeText } from "./NarrativeText"; // Importa el nuevo componente

export function InteractiveStory({ storyData }) {
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startId);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleDecision = (nextNodeId, decision = null) => {
    if (decision) {
      setHistory([...history, decision]);
    }
    setCurrentNodeId(nextNodeId);
  };

  const currentNode = storyData.nodes.find((node) => node.id === currentNodeId);

  // Cuando se llega a un nodo final, redirigimos a la vista de retroalimentación
  useEffect(() => {
    if (currentNode && currentNode.type === "final") {
      navigate("/retroalimentacion1", { state: { history, node: currentNode } });
    }
  }, [currentNode, history, navigate]);

  // Mientras no se encuentre el nodo o estamos en nodo final, no renderizamos nada.
  if (!currentNode || currentNode.type === "final") {
    return null;
  }

  // Se verifica el tipo de nodo para renderizar el componente adecuado
  if (currentNode.type === "texto") {
    return <NarrativeText node={currentNode} onNext={handleDecision} />;
  }

  // Nodos interactivos con opciones
  return (
    <StoryNode node={currentNode} onDecision={handleDecision} />
  );
}
