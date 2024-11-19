import React from "react";
import "./Tienda.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Navbar } from "../components/Navbar";

export function Tienda() {
  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2>Tienda</h2>
            <p>
              <span className="exp-text">Exp</span> 5000 - <b></b>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              234
            </p>
          </div>
          <div className="content-tienda">
            <div className="tienda-image"></div>
            <div className="tienda-name"></div>
          </div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  );
}