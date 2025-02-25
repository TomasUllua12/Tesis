// retroalimentacion1.jsx
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import "./Retroalimentacion1.css";

export default function Retroalimentacion1() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { history, node } = location.state || {};

  if (!node) {
    return (
      <div>Error: No se encontró la información de retroalimentación.</div>
    );
  }

  if (isLoading) {
    return <LoadingScreen setIsLoading={setIsLoading} />;
  }

  return (
    <div className="retroalimentacion-view">
      <h2>María y su herencia</h2>
      <div className="cap-loading-desafio-progress-bar">
        <div
          className="cap-loading-desafio-progress-fill"
          style={{ width: `100%` }}
        ></div>
      </div>
      <div className="contenido-feedback">{node.contenido}</div>
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
      <div className="cap-pieview">
        <Link to="/Aprender/Etapa1">Entendido</Link>
      </div>
    </div>
  );
}
