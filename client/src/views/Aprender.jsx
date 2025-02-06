// Client/views/Aprender.jsx
import React, { useContext } from "react";
import { Navbar } from "../components/Navbar";
import "./Aprender.css";
import { Chat } from "../components/Chat";
import { Etapa } from "../components/Etapa";
import { Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { DarkModeContext } from "../context/DarkModeContext";

export function Aprender(props) {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className={darkMode ? "general-main-dark" : "general-main"}>
          <MainHeader title="Aprender" />

          <Etapa
            titulo="Principios de las Finanzas Personales"
            url="Etapa1"
            details="Detalles1"
            image="/public/Etapa1.png"
          />
          <Etapa
            titulo="Construcción y Crecimiento del Patrimonio"
            url="Etapa2"
            details="Detalles2"
            state="Block"
            image="/public/..png"
          />
          <Etapa
            titulo="Estrategias Avanzadas y Protección Financiera"
            url="Etapa3"
            details="Detalles3"
            state="Block"
            image="/public/..png"
          />
          <Etapa
            titulo="Innovación, Emprendimiento y Visión a Futuro"
            url="Etapa4"
            details="Detalles4"
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
