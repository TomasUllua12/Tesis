import React from "react";
import "./Desafios.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Navbar } from "../components/Navbar";

export function Desafios() {
  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2>Desafíos</h2>
            <p>
              <span className="exp-text">Exp</span> 5000 - <b></b>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              234
            </p>
          </div>
          <div className="content-desafio">
            <div className="desafio-image"></div>
            <div className="desafio-name"></div>
          </div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  );
}