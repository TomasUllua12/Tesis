import React from "react";
import { useNavigate } from "react-router-dom";
import "./Capitulo2.css";

function Capitulo2() {
  const navigate = useNavigate();

  const volverAEtapa = () => {
    navigate("/aprender/etapa1");
  };

  return (
    <div className="cap2-bg">
      <div className="cap2-container">
        <img
          src="/mantenimiento.png"
          alt="Capítulo en construcción"
          className="cap2-imagen"
        />
        <h2 className="cap2-titulo">Este capítulo aún no está disponible</h2>
        <p className="cap2-texto">
          Estamos trabajando para que puedas seguir aprendiendo muy pronto.
        </p>
        <button className="cap2-boton" onClick={volverAEtapa}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default Capitulo2;
