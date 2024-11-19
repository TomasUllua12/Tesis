import React from "react";
import "./Tienda.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

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
          <div className="general-main-pie">
            <img src="/Finverse logo.png" alt="Finverse Logo" />
            <div className="links-container">
              <Link to="/Aprender">Aprender</Link>
              <Link to="/Desafios">Desafíos</Link>
              <Link to="/Tienda">Tienda</Link>
              <Link to="/Perfil">Perfil</Link>
            </div>
            <p>Copyrights © 2024 Finverse. Todos los derechos reservados.</p>
          </div>
        </div>
        <Chat />
      </div>
    </div>
  );
}
