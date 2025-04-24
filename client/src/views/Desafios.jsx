// Client/views/Desafios.jsx
import React, { useContext, useState, useEffect } from "react";
import "./Desafios.css";
import { Chat } from "../components/Chat";
import { Desafio } from "../components/Desafio";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { DarkModeContext } from "../context/DarkModeContext";

export function Desafios() {
  const { darkMode } = useContext(DarkModeContext);
  const [user, setUser] = useState(null);

  // 1) Carga el perfil como en Etapa1
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const resp = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) throw new Error("No autorizado");
        const { user } = await resp.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchUser();
  }, []);

  const completed = user?.completed_chapters || [];

  // 2) Define los retos 🌟
  // - Módulo 1: 8 capítulos (capitulo1…capitulo8)
  const totalM1 = 8;
  const doneM1  = completed.filter((c) => c.startsWith("capitulo")).length;
  const progM1  = Math.round((doneM1 / totalM1) * 100);

  // Por ejemplo, otro reto podría basarse en experiencia:
  const neededExp = 2000;
  const currExp   = user?.experience || 0;
  const progExp   = Math.min(Math.round((currExp / neededExp) * 100), 100);

  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Desafíos" />

          <div className="content-desafio">

            {/* Reto: completar Módulo 1 */}
            <Desafio
              titulo="Completa el Módulo 1 de Aprendizaje"
              url="Aprender/Etapa1"
              image="/public/insignias/Insignia1.png"
              currentStep={doneM1}
              totalSteps={totalM1}
              progress={progM1}
              medalKey="modulo1"
            />

            {/* Reto: llegar a cierta EXP */}
            <Desafio
              titulo={`Alcanza ${neededExp} de experiencia`}
              url="Perfil"
              image="/public/insignias/InsigniaExp.png"
              currentStep={currExp}
              totalSteps={neededExp}
              progress={progExp}
              medalKey="exp2000"
            />

            {/* Y así puedes añadir más */}
          </div>

          <div className="general-main-pie">
            <img
              src={
                darkMode
                  ? "../../public/FinverseLogoDark.png"
                  : "../../public/FinverseLogoLight.png"
              }
              alt="Finverse Logo"
            />
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
