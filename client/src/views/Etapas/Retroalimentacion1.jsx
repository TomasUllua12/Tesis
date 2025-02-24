// retroalimentacion1.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";

export default function Retroalimentacion1() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { history, node } = location.state || {};

  if (!node) {
    return <div>Error: No se encontró la información de retroalimentación.</div>;
  }

  if (isLoading) {
    return <LoadingScreen setIsLoading={setIsLoading} />;
  }

  return (
    <div className="retroalimentacion-view">
      <h2>Retroalimentación</h2>
      <div className="contenido-feedback">
        {node.contenido}
      </div>
      <div className="historial-decisiones">
        <h3>Tus decisiones:</h3>
        <ul>
          {history.map((decision, index) => (
            <li key={index}>
              <strong>{decision.texto}:</strong> {decision.descripcion}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/Aprender/Etapa1">Volver al inicio</Link>
    </div>
  );
}
