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
          headers: { Authorization: `Bearer ${token}` },
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
      tooltip: `La historia de la familia Torres revela cómo las costumbres diarias con el dinero —aunque pequeñas— pueden marcar una gran diferencia en el bienestar financiero. Acompañalos mientras revisan sus hábitos y descubren la importancia de tomar decisiones conscientes desde casa.`,
    },
    {
      number: 2,
      key: "capitulo2",
      title: "Lucía y su presupuesto familiar",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Lucía se enfrenta al desafío de equilibrar ingresos y gastos mientras mantiene a su familia. Este capítulo enseña cómo crear y ajustar un presupuesto realista para lograr estabilidad sin dejar de lado los pequeños placeres de la vida.`,
    },
    {
      number: 3,
      key: "capitulo3",
      title: "Ramón y su reto de ahorrar cada mes",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Ramón quiere lograr algo que muchos intentan: ahorrar de forma constante. Sin embargo, los imprevistos y tentaciones del día a día ponen a prueba su compromiso. Aprendé con él cómo implementar técnicas de ahorro sostenibles.`,
    },
    {
      number: 4,
      key: "capitulo4",
      title: "Julio y su objetivo de comprar una moto",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Julio sueña con tener su primera moto. ¿Cuál es la mejor forma de lograrlo? ¿Ahorrar o financiar? ¿Qué gastos hay que tener en cuenta más allá de la compra? Este capítulo explora la planificación de metas concretas.`,
    },
    {
      number: 5,
      key: "capitulo5",
      title: "Paola y su primera tarjeta de crédito",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Paola acaba de recibir su primera tarjeta de crédito. Todo parece fácil hasta que el primer resumen llega. ¿Cómo usarla con responsabilidad? Una historia muy común con decisiones que pueden marcar el futuro financiero.`,
    },
    {
      number: 6,
      key: "capitulo6",
      title: "David y las tasas de interés",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `David comienza a notar que los créditos, préstamos e inversiones hablan de “tasas de interés”. En su intento por entenderlas, descubre cómo este concepto afecta a casi todas las decisiones financieras importantes.`,
    },
    {
      number: 7,
      key: "capitulo7",
      title: "Laura y su primera inversión a plazo fijo",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `Laura decide que es hora de hacer que su dinero trabaje para ella. Con su primera inversión a plazo fijo, explora conceptos clave como rentabilidad, riesgo y horizonte temporal. ¿Es la mejor opción para ella?`,
    },
    {
      number: 8,
      key: "capitulo8",
      title: "María y su herencia",
      path: "/Aprender/Etapa1/Capitulo2",
      tooltip: `María acaba de recibir una herencia. Aunque al principio lo ve como una bendición, pronto se da cuenta de que administrar un dinero inesperado puede ser tan difícil como ganarlo. Este capítulo aborda la toma de decisiones conscientes ante ingresos extraordinarios.`,
    }
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
                  {cap.state === "Completed" && (
                    <Link
                      to={`/Aprender/Etapa1/${cap.key}/resumen`}
                      className="btn-resumen"
                    >
                      <img
                        src="../../../public/iconos/resumen.png"
                        alt="Resumen"
                        className="icon-resumen"
                      />
                    </Link>
                  )}
                  {cap.state === "Active" || cap.state === "Completed" ? (
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
                    <p className="capitulo-number">Capítulo {cap.number}</p>
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
