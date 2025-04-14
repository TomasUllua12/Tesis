import React, { useContext } from "react";
import "./Etapa1.css";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { ImageButton } from "../../components/ImageButton";
import { Link } from "react-router-dom";
import { MainHeader } from "../../components/MainHeader";
import { DarkModeContext } from "../../context/DarkModeContext";

export function Etapa1(props) {
  const { darkMode } = useContext(DarkModeContext);

  // Definimos los capítulos con su estado
  const capitulos = [
    {
      number: 1,
      title: "La familia Torres y sus hábitos financieros",
      state: "Active",
      path: "/Capitulo1",
      tooltip: `María recibe una herencia y no sabe qué hacer con el dinero inesperado. Se analizan las opciones para administrar un capital repentino, desde ahorrar en cuentas seguras hasta invertir en opciones con distintos niveles de riesgo. También se discuten los peligros de gastar sin planificación.`,
    },
    {
      number: 2,
      title: "Julio y su objetivo de comprar una moto",
      state: "Block",
      path: "/Capitulo2",
      tooltip: 'Julio desea comprarse una moto sin comprometer sus finanzas familiares. Se introduce la importancia de fijar objetivos financieros a corto y mediano plazo, y cómo establecer metas claras y realistas.',
    },
    {
      number: 3,
      title: "Lucía y su presupuesto familiar",
      state: "Block",
      path: "/Capitulo3",
      tooltip: 'Lucía intenta organizar los gastos del hogar para llegar a fin de mes. Cómo elaborar un presupuesto, registrar ingresos y egresos, y detectar fugas de dinero. Se enseñan métodos para controlar y ajustar gastos.'
    },
    {
      number: 4,
      title: "Ramón y su reto de ahorrar cada mes",
      state: "Block",
      path: "/Capitulo4",
      tooltip: 'Ramón lucha por mantener el hábito de ahorrar, pues siempre termina usando ese dinero. Métodos de ahorro, fondo de emergencia y técnicas para automatizar el ahorro y no caer en la tentación de gastarlo antes de tiempo.'
    },
    {
      number: 5,
      title: "Paola y su primera tarjeta de crédito",
      state: "Block",
      path: "#",
      tooltip: 'Paola obtiene su primera tarjeta de crédito y desconoce cómo funciona realmente. Se explica el manejo responsable del crédito, las tasas de interés, el pago mínimo vs. pago total y cómo evitar el sobreendeudamiento.'
    },
    {
      number: 6,
      title: "David y las tasas de interés",
      state: "Block",
      path: "#",
      tooltip: 'David solicita un préstamo para su negocio, pero se sorprende al leer la letra pequeña sobre tasas de interés. Se profundiza en el cálculo de intereses y cómo influyen en préstamos y productos financieros. Relevancia de comparar opciones bancarias.'
    },
    {
      number: 7,
      title: "Laura y su primera inversión a plazo fijo",
      state: "Block",
      path: "#",
      tooltip: 'Laura desea hacer crecer sus ahorros sin tomar grandes riesgos. Explicación de inversiones sencillas como cuentas de ahorro, certificados a plazo y bonos de bajo riesgo, junto con sus ventajas y desventajas.'
    },
    {
      number: 8,
      title: "La familia Torres y sus hábitos financieros",
      state: "Block",
      path: "#",
      tooltip: 'La familia Torres identifica malos hábitos financieros que les impiden avanzar. Revisión de consejos para mejorar la disciplina y el orden con el dinero, consolidando los conceptos vistos en todo el módulo.'
    },
  ];

  return (
    <>
      <div className="color-line-etapa1"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Módulo 1" />

          <div className="main-capitulos">
            {capitulos.map((capitulo, index) => (
              <React.Fragment key={index}>
                <div className="capitulo">
                  {capitulo.state === "Active" ? (
                    <Link to={capitulo.path}>
                      <ImageButton state={capitulo.state} />
                    </Link>
                  ) : (
                    <ImageButton state={capitulo.state} />
                  )}
                  <div
                    className={`titulo-capitulo ${
                      capitulo.state === "Block" ? "blocked" : ""
                    }`}
                  >
                    <p className="capitulo-number">
                      Capítulo {capitulo.number}
                    </p>
                    <div className="tooltip-container">
                      <p className="capitulo-titulo">{capitulo.title}</p>
                      {capitulo.tooltip && (
                        <span className="tooltip-text">{capitulo.tooltip}</span>
                      )}
                    </div>
                  </div>
                </div>
                {index < capitulos.length - 1 && (
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
