import React, { useContext, useState, useEffect } from "react";
import "./Etapa1.css";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { ImageButton } from "../../components/ImageButton";
import { Link } from "react-router-dom";
import { MainHeader } from "../../components/MainHeader";
import { DarkModeContext } from "../../context/DarkModeContext";

export function Etapa1() {
  const { darkMode } = useContext(DarkModeContext);

  // 1) Estado para el usuario y sus capítulos completados
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const completed = user?.completed_chapters || [];

  // Definimos los capítulos con su estado
  const baseCapitulos = [
    {
      number: 1,
      key: "capitulo1",
      title: "La familia Torres y sus hábitos financieros",
      path: "/aprender/etapa1/capitulo1",
      tooltip: `María recibe una herencia…`
    },
    {
      number: 2,
      key: "capitulo2",
      title: "Julio y su objetivo de comprar una moto",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Julio desea comprarse una moto…`
    },
    // … resto de capítulos con sus number y key
  ];

  // 3) Derivamos el estado de cada uno: Completed, Active o Block
  const capitulos = baseCapitulos.map((c) => {
    let state;
    if (completed.includes(c.key)) {
      state = "Completed";
    } else if (
      c.number === 1 ||
      completed.includes(`capitulo${c.number - 1}`)
    ) {
      state = "Active";
    } else {
      state = "Block";
    }
    return { ...c, state };
  });

  return (
    <>
      <div className="color-line-etapa1"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Módulo 1" />

          <div className="main-capitulos">
            {capitulos.map((cap, idx) => (
              <React.Fragment key={cap.key}>
                <div className="capitulo">
                  {(cap.state === "Active" || cap.state === "Completed") ? (
                    <Link to={cap.path}>
                      <ImageButton state={cap.state} />
                    </Link>
                  ) : (
                    <ImageButton state="Block" />
                  )}
                  <div
                    className={`titulo-capitulo ${
                      cap.state === "Block" ? "blocked" : cap.state === "Completed" ? "completed" : ""
                    }`}
                  >
                    <p className="capitulo-number">
                      Capítulo {cap.number}
                    </p>
                    <div className="tooltip-container">
                      <p className="capitulo-titulo">{cap.title}</p>
                      {cap.tooltip && (
                        <span className="tooltip-text">{cap.tooltip}</span>
                      )}
                    </div>
                  </div>
                </div>
                {idx < capitulos.length - 1 && (
                  <div className="separator">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
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
    </>
  );
}
