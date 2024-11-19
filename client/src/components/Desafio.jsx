import React, { useState } from "react";
import "./Desafio.css";
import { useNavigate } from "react-router-dom";

export function Desafio(props) {
  const isBlocked = props.progress !== 100;
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isBlocked) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else {
      // Redirigir al usuario al desafío
    }
  };

  return (
    <>
      <div className="desafio-card">
        <div className="desafio-card-izq">
          <div className="desafio-titulo">
            <p>{props.titulo}</p>
          </div>
          {/* Barra de carga */}
          <p className="p-barra">{`${props.currentStep} / ${props.totalSteps}`}</p>
          <div className="desafio-progress-bar">
            <div
              className="desafio-progress-fill"
              style={{ width: `${props.progress}%` }}
            ></div>
          </div>
          <div className="desafio-boton-container">
            <button
              className={`desafio-boton ${isBlocked ? "blocked" : ""}`}
              onClick={handleButtonClick}
            >
              Reclamar
            </button>
          </div>
        </div>
        <div className="desafio-card-der">
          <img
            src={props.image}
            alt="Imagen desafío"
            className={`desafio-card-der-img ${isBlocked ? "blocked" : ""}`}
          />
        </div>
      </div>
      {/* Mostrar mensaje si el desafío está bloqueado */}
      {showMessage && (
        <div className="blocked-message">
          <p>Debe completar el desafío para continuar.</p>
        </div>
      )}
    </>
  );
}
