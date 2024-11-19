import React from "react";
import { Navbar } from "../components/Navbar";
import "./Aprender.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Link } from "react-router-dom";

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
            titulo="Planeación Financiera a Largo Plazo"
            url="Etapa2"
            details="Detalles1"
            state="Block"
            image="/public/..png"
          />
          <Etapa
            titulo="Protección Financiera y Seguros"
            url="Etapa3"
            details="Detalles1"
            state="Block"
            image="/public/..png"
          />
          <Etapa
            titulo="El Mercado y los Productos Financieros"
            url="Etapa4"
            details="Detalles1"
            state="Block"
            image="/public/..png"
          />
          <Etapa
            titulo="Criptomonedas"
            url="Etapa5"
            details="Detalles1"
            state="Block"
            image="/public/..png"
          />
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
    </>
  );
}
