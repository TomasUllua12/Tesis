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

  // 2) Define los retos 🌟
  // - Módulo 1: 8 capítulos (capitulo1…capitulo8)
  const totalC1 = 1;
  const doneC1  = completed.filter((c) => c.startsWith("capitulo")).length;
  const progC1  = Math.round((doneC1 / totalC1) * 100);

  // Por ejemplo, otro reto podría basarse en experiencia:
  const neededExp = 2000;
  const currExp   = user?.experience || 0;
  const progExp   = Math.min(Math.round((currExp / neededExp) * 100), 100);

  // Por ejemplo, otro reto podría basarse en experiencia:
  const neededExp2 = 5000;
  const currExp2   = user?.experience || 0;
  const progExp2   = Math.min(Math.round((currExp2 / neededExp2) * 100), 100);

  // Por ejemplo, otro reto podría basarse en experiencia:
  const neededExp3 = 10000;
  const currExp3   = user?.experience || 0;
  const progExp3   = Math.min(Math.round((currExp3 / neededExp3) * 100), 100);

  // Por ejemplo, otro reto podría basarse en experiencia:
  const neededExp4 = 20000;
  const currExp4   = user?.experience || 0;
  const progExp4   = Math.min(Math.round((currExp4 / neededExp4) * 100), 100);

  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Desafíos" />

          <div className="content-desafio">

            {/* Reto: completar Capítulo 1 */}
            <Desafio
              titulo="Completa el Capítulo 1 del Módulo 1"
              url="Aprender/Etapa1"
              image="/public/insignias/medal1.png"
              currentStep={doneC1}
              totalSteps={totalC1}
              progress={progC1}
              medalKey="modulo1"
            />

            {/* Reto: completar Módulo 1 */}
            <Desafio
              titulo="Completa el Módulo 1"
              url="Aprender/Etapa1"
              image="/public/insignias/Modulo2.png"
              currentStep={doneM1}
              totalSteps={totalM1}
              progress={progM1}
              medalKey="modulo2"
            />

            {/* Reto: completar Capítulo 1 */}
            <Desafio
              titulo="Completa el Capítulo 1 del Módulo 2"
              url="Aprender/Etapa1"
              image="/public/insignias/insignia3.png"
              currentStep={0}
              totalSteps={1}
              progress={0}
              medalKey="modulo1"
            />

            {/* Reto: completar Módulo 1 */}
            <Desafio
              titulo="Completa el Módulo 2"
              url="Aprender/Etapa1"
              image="/public/insignias/Medal2.png"
              currentStep={0}
              totalSteps={8}
              progress={0}
              medalKey="modulo2"
            />

            {/* Reto: completar Capítulo 1 */}
            <Desafio
              titulo="Completa el Capítulo 1 del Módulo 3"
              url="Aprender/Etapa1"
              image="/public/insignias/insignia2.png"
              currentStep={0}
              totalSteps={1}
              progress={0}
              medalKey="modulo1"
            />

            {/* Reto: completar Módulo 1 */}
            <Desafio
              titulo="Completa el Módulo 3"
              url="Aprender/Etapa1"
              image="/public/insignias/Medal3.png"
              currentStep={0}
              totalSteps={8}
              progress={0}
              medalKey="modulo2"
            />

            {/* Reto: completar Capítulo 1 */}
            <Desafio
              titulo="Completa el Capítulo 1 del Módulo 4"
              url="Aprender/Etapa1"
              image="/public/insignias/insignia4.png"
              currentStep={0}
              totalSteps={1}
              progress={0}
              medalKey="modulo1"
            />

            {/* Reto: completar Módulo 1 */}
            <Desafio
              titulo="Completa el Módulo 4"
              url="Aprender/Etapa1"
              image="/public/insignias/Medal4.png"
              currentStep={0}
              totalSteps={8}
              progress={0}
              medalKey="modulo2"
            />

            {/* Reto: llegar a cierta EXP */}
            <Desafio
              titulo={`Alcanza ${neededExp} de experiencia`}
              url="Perfil"
              image="/public/insignias/experiencia.png"
              currentStep={currExp}
              totalSteps={neededExp}
              progress={progExp}
              medalKey="experiencia"
            />

            {/* Y así puedes añadir más */}
            <Desafio
              titulo={`Alcanza ${neededExp2} de experiencia`}
              url="Perfil"
              image="/public/insignias/experiencia5000.png"
              currentStep={currExp2}
              totalSteps={neededExp2}
              progress={progExp2}
              medalKey="experiencia5000"
            />

            {/* Y así puedes añadir más */}
            <Desafio
              titulo={`Alcanza ${neededExp3} de experiencia`}
              url="Perfil"
              image="/public/insignias/experiencia10k.png"
              currentStep={currExp3}
              totalSteps={neededExp3}
              progress={progExp3}
              medalKey="experiencia10000"
            />

            {/* Y así puedes añadir más */}
            <Desafio
              titulo={`Alcanza ${neededExp4} de experiencia`}
              url="Perfil"
              image="/public/insignias/experiencia20k.png"
              currentStep={currExp4}
              totalSteps={neededExp4}
              progress={progExp4}
              medalKey="experiencia20000"
            />
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
