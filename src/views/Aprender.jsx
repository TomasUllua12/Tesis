import React from "react";
import { Navbar } from "../components/Navbar";
import "./Aprender.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";

export function Aprender(props) {
  return (
    <>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2>Aprender</h2>
            <p>
              <span className="exp-text">Exp</span> 5000 - <b></b>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              234
            </p>
          </div>
          <Etapa
            titulo="Principios de las Finanzas Personales"
            url="Etapa1"
            details="Detalles1"
            image="/public/Etapa1.png"
          />
          <Etapa
            titulo="Inversiones de Riesgo Bajo"
            url="Etapa2"
            details="Detalles1"
            state="Block"
            image="/public/Etapa1.png"
          />
          <Etapa
            titulo="Inversiones de Riesgo Medio"
            url="Etapa3"
            details="Detalles1"
            state="Block"
            image="/public/Etapa1.png"
          />
          <Etapa
            titulo="Inversiones de Riesgo Alto"
            url="Etapa4"
            details="Detalles1"
            state="Block"
            image="/public/Etapa1.png"
          />
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </>
  );
}
