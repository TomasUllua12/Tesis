// StoryNode.jsx
import React from "react";

export function StoryNode({ node, onDecision }) {
  return (
    <div className="story-node">
      <div className="contenido-nodo">
        {node.contenido}
      </div>
      <div className="opciones">
        {node.opciones.map((opcion, index) => (
          <div key={index} className="opcion">
            <button onClick={() => onDecision(opcion.nextNodeId, opcion)}>
              {opcion.texto}
            </button>
            <p className="descripcion-opcion">{opcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
