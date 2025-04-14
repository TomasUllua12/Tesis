// NarrativeText.jsx
import React from "react";
import "./nodeText.css";

export function NarrativeText({ node, onNext }) {
  return (
    <div className="story-narrative">
      <div className="contenido-nodo">{node.contenido}</div>
      <button onClick={() => onNext(node.nextNodeId)}>
        Siguiente
      </button>
    </div>
  );
}
