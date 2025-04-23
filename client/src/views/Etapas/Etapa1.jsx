// Client/views/Etapa1.jsx
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

  // Estado para el usuario y sus capítulos completados
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const resp = await fetch("http://localhost:5000/api/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!resp.ok) throw new Error("No autorizado");
        const { user } = await resp.json();
        setUser(user);
        // Sincronizar también el localStorage
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.error("Error cargando perfil:", err);
      }
    };
    fetchUser();
  }, []);

  const completed = user?.completed_chapters || [];

  // Lista base de capítulos
  const baseCapitulos = [
    {
      number: 1,
      key: "capitulo1",
      title: "La familia Torres y sus hábitos financieros",
      path: "/Aprender/Etapa1/Capitulo1",
      tooltip: `María recibe una herencia…`
    },
    {
      number: 2,
      key: "capitulo2",
      title: "Julio y su objetivo de comprar una moto",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Julio desea comprarse una moto…`
    },
    {
      number: 3,
      key: "capitulo3",
      title: "Lucía y su presupuesto familiar",
      path: "/Aprender/Etapa1/Capitulo3",
      tooltip: `Lucía intenta organizar los gastos…`
    },
    {
      number: 4,
      key: "capitulo4",
      title: "Ramón y su reto de ahorrar cada mes",
      path: "/Aprender/Etapa1/Capitulo4",
      tooltip: `Ramón lucha por mantener el hábito…`
    },
    {
      number: 5,
      key: "capitulo5",
      title: "Paola y su primera tarjeta de crédito",
      path: "/Aprender/Etapa1/Capitulo5",
      tooltip: `Paola obtiene su primera tarjeta…`
    },
    // …otros capítulos si aplican
  ];

  // Derivar estado: Completed, Active o Block
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
                      cap.state === "Block"
                        ? "blocked"
                        : cap.state === "Completed"
                        ? "completed"
                        : ""
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
