import React from "react";
import "./Perfil.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export function Perfil() {
  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2>Perfil</h2>
          </div>
          <div className="content-perfil">
            <div className="perfil-image">
              <div className="perfil-image__1"></div>
            </div>
            <div className="perfil-name">Juan Pérez</div>
            <div className="perfil-expmon">
              <p>
                <span className="exp-text">Exp</span> 5000 - <b></b>
                <span>
                  <img
                    src="/public/Coin.gif"
                    alt="Coins"
                    className="gif-span"
                  />
                </span>
                234
              </p>
            </div>
            <div className="perfil-insignias">
              <h2>Insignias Obtenidas</h2>
              <div className="perfil-insignias-obtenidas">
                <div className="insignia">
                  <img src="/insignias/Insignia1.png" alt="Insignia 1" />
                  <span className="tooltip-text">Módulo 1 Completado</span>
                </div>
                <div className="insignia">
                  <img src="/insignias/Insignia4.png" alt="Insignia 4" />
                  <span className="tooltip-text">Módulo 2 Completado</span>
                </div>
                <div className="insignia">
                  <img src="/insignias/Insignia5.png" alt="Insignia 5" />
                  <span className="tooltip-text">Módulo 3 Completado</span>
                </div>
                <div className="insignia">
                  <img src="/insignias/Insignia3.png" alt="Insignia 3" />
                  <span className="tooltip-text">Módulo 4 Completado</span>
                </div>
              </div>
            </div>
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
