import React from "react";
import "./Etapa1.css";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { ImageButton } from "../../components/ImageButton";
import { Link } from "react-router-dom";
import { MainHeader } from "../../components/MainHeader";

export function Etapa1(props) {
  // Definimos los capítulos con su estado
  const capitulos = [
    {
      number: 1,
      title: "María y su Herencia",
      state: "Active",
      path: "/Capitulo1",
    },
    {
      number: 2,
      title: "Jorge y la Proyección de su Jubilación",
      state: "Block",
      path: "/Capitulo2",
    },
    {
      number: 3,
      title: "Martín, Julia y su Viaje Soñado",
      state: "Block",
      path: "/Capitulo3",
    },
    {
      number: 4,
      title: "Carla y la Expanción de su Empresa",
      state: "Block",
      path: "/Capitulo4",
    },
    { number: 5, title: "-", state: "Block", path: "#" },
    { number: 6, title: "-", state: "Block", path: "#" },
    { number: 7, title: "-", state: "Block", path: "#" },
    { number: 8, title: "-", state: "Block", path: "#" },
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
                    <p className="capitulo-titulo">{capitulo.title}</p>
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
