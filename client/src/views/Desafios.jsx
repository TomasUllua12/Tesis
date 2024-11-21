import React from "react";
import "./Desafios.css";
import { Chat } from "../components/Chat";
import { Desafio } from "../components/Desafio";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

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
            <Desafio
              titulo="Interactua con Finvy!"
              url="Etapa1"
              image="/public/insignias/Insignia3.png"
              currentStep={1}
              totalSteps={1}
              progress={100}
            />
            <Desafio
              titulo="Completa el Módulo 1 de Aprendizaje"
              url="Etapa1"
              image="/public/insignias/Insignia1.png"
              currentStep={1}
              totalSteps={8}
              progress={100/8}
            />
            <Desafio
              titulo="Completa el Módulo 2 de Aprendizaje"
              url="Etapa1"
              image="/public/insignias/Insignia5.png"
              currentStep={0}
              totalSteps={8}
              progress={0}
            />
            <Desafio
              titulo="Completa el Módulo 3 de Aprendizaje"
              url="Etapa1"
              image="/public/insignias/Insignia3.png"
              currentStep={0}
              totalSteps={8}
              progress={0}
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
