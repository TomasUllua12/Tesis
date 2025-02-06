import React, { useState, useContext } from "react";
import "./Etapa.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export function Etapa(props) {
  const isBlocked = props.state === "Block";
  const [showMessage, setShowMessage] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const handleBlockedClick = () => {
    if (isBlocked) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000); // El mensaje desaparecerá después de 3 segundos
    }
  };

  return (
    <>
      <div className={darkMode ? "etapa-card-dark" : "etapa-card"} onClick={handleBlockedClick}>
        {/* Si la etapa está bloqueada, se renderiza el overlay */}
        {isBlocked && (
          <div className="etapa-overlay">
            <img
              src="/public/Candado.gif" // Reemplaza por la ruta del logo
              alt="Bloqueado"
              className="etapa-overlay-logo"
            />
          </div>
        )}
        <div className="etapa-card-izq">
          <div className="etapa-detalles">
            <Link to={`/Aprender/${props.details}`}>Ver detalles</Link>
          </div>
          <div className="etapa-titulo">
            <p>{props.titulo}</p>
          </div>
          <Link to={`/Aprender/${props.url}`}>
            <button className="etapa-boton" disabled={isBlocked}>
              Continuar
            </button>
          </Link>
        </div>
        <div className="etapa-card-der">
          <img
            src={props.image} // Reemplaza con la ruta correcta de la imagen
            alt="Imagen Etapa"
            className="etapa-card-der-img"
          />
        </div>
        <div className={`blocked-message ${showMessage ? "show" : ""}`}>
          Debes completar las etapas anteriores para desbloquear esta. ¡Suerte!
        </div>
      </div>
    </>
  );
}
