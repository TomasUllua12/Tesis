import React from "react";
import "./Detalles1.css";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";

export function Detalles1(props) {
  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2> Detalles Módulo 1 </h2>
            <p>
              <span className="exp-text">Exp</span> 5000 - <b></b>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              234
            </p>
          </div>
          <div className="card-detalles"></div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  );
}
