import React, { useState, useContext } from "react";
import "./Desafio.css";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { claimMedal } from "../../services/medalService";

export function Desafio(props) {
  const { darkMode } = useContext(DarkModeContext);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const earned = user.earned_medals || [];
  const isClaimed = earned.includes(props.medalKey);

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
              className={`desafio-boton ${
                isBlocked || isClaimed ? "blocked" : ""
              }`}
              onClick={async () => {
                if (isBlocked) {
                  setShowMessage(true);
                  setTimeout(() => setShowMessage(false), 3000);
                } else if (!isClaimed) {
                  try {
                    await claimMedal(props.medalKey);
                    // actualizar localStorage
                    user.earned_medals = [...earned, props.medalKey];
                    localStorage.setItem("user", JSON.stringify(user));
                    setShowMessage("¡Medalla reclamada!");
                    setTimeout(() => setShowMessage(false), 3000);
                  } catch {
                    setShowMessage("Error al reclamar medalla");
                    setTimeout(() => setShowMessage(false), 3000);
                  }
                }
              }}
              disabled={isBlocked || isClaimed}
            >
              {isClaimed ? "Reclamada" : "Reclamar"}
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
