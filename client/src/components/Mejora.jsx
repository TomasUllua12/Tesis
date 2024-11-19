import React, { useState } from "react";
import "./mejora.css";
import { useNavigate } from "react-router-dom";

export function Mejora(props) {
  const isBlocked = props.progress !== 100;
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="mejora-card">
        <div className="mejora-titulo">
          <p>{props.titulo}</p>
        </div>
        <div className="mejora-card-der">
          <img
            src={props.image}
            alt="Imagen Mejora"
            className={`mejora-card-der-img ${isBlocked ? "blocked" : ""}`}
          />
        </div>
        <div className="mejora-card-izq">
          <div className="mejora-precio">
            <p>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              {props.price}
            </p>
          </div>
          <div className="mejora-boton-container">
            <button className="mejora-boton">Comprar</button>
          </div>
        </div>
      </div>
    </>
  );
}
