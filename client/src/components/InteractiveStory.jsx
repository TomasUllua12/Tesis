// InteractiveStory.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoryNode } from "./StoryNode";

export function InteractiveStory({ storyData }) {
  const [currentNodeId, setCurrentNodeId] = useState(storyData.startId);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleDecision = (nextNodeId, decision) => {
    setHistory([...history, decision]);
    setCurrentNodeId(nextNodeId);
  };

  const currentNode = storyData.nodes.find((node) => node.id === currentNodeId);

  // Cuando se llega a un nodo final, redirigimos a la vista de retroalimentación
  useEffect(() => {
    if (currentNode && currentNode.type === "final") {
      // Navegamos a la ruta "/retroalimentacion1" y pasamos los datos necesarios en el state
      navigate("/retroalimentacion1", { state: { history, node: currentNode } });
    }
  }, [currentNode, history, navigate]);

  // Mientras se procesa la redirección o si no se encuentra el nodo, se puede mostrar un loader o nada.
  if (!currentNode || currentNode.type === "final") {
    return null;
  }

  return (
    <StoryNode node={currentNode} onDecision={handleDecision} />
  );
}
