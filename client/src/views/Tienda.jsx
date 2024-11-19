import React from "react";
import "./Tienda.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { Mejora } from "../components/Mejora";

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
            <Mejora
              titulo="Modo Oscuro"
              image="/public/Mejoras/ModoOscuro.png"
              price={1000}
            />
            <Mejora
              titulo="Mejora 1"
              image="/public/Mejoras/MejoraAux.png"
              price={350}
            />
            <Mejora
              titulo="Mejora 2"
              image="/public/Mejoras/MejoraAux.png"
              price={100}
            />
            <Mejora
              titulo="Mejora 3"
              image="/public/Mejoras/MejoraAux.png"
              price={450}
            />
            <Mejora
              titulo="Mejora 4"
              image="/public/Mejoras/MejoraAux.png"
              price={700}
            />
            <Mejora
              titulo="Mejora 5"
              image="/public/Mejoras/MejoraAux.png"
              price={150}
            />
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
