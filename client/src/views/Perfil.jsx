// Client/views/Perfil.jsx
import React, { useEffect, useState, useContext } from "react";
import "./Perfil.css";
import { Chat } from "../components/Chat";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export function Perfil() {
  const [user, setUser] = useState(null);
  // Se inicializa el estado 'profileImage' con el valor guardado o con el valor por defecto.
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || "/Tipo1ojo.gif";
  });

  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función que cambia la imagen del perfil y la guarda en localStorage.
  const toggleProfileImage = () => {
    const newImage =
      profileImage === "/Tipo1ojo.gif" ? "/Tipo2ojo.gif" : "/Tipo1ojo.gif";
    setProfileImage(newImage);
    localStorage.setItem("profileImage", newImage);
  };

  // Extraemos las medallas reclamadas (puede ser undefined si no existe)
  const earned = user?.earned_medals || [];

  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <div className="general-main-encabezado">
            <h2>Perfil</h2>
          </div>
          <div className="content-perfil">
            {/* Al hacer click en la imagen se alterna el perfil */}
            <div className="perfil-image" onClick={toggleProfileImage}>
              <div
                className="perfil-image__1"
                style={{ backgroundImage: `url(${profileImage})` }}
              ></div>
            </div>

            <div className="perfil-name">
              {user ? user.nombre : "Cargando..."}
            </div>

            <div className="perfil-expmon">
              <p>
                <span className="exp-text">Exp</span>{" "}
                {user ? user.experience : 0} -{" "}
                <b></b>
                <span>
                  <img
                    src="/public/Coin.gif"
                    alt="Coins"
                    className="gif-span"
                  />
                </span>{" "}
                {user ? user.coins : 0}
              </p>
            </div>

            <div className="perfil-insignias">
              <h2>Insignias Obtenidas</h2>
              <div className="perfil-insignias-obtenidas">
                {earned.length > 0 ? (
                  earned.map((medalKey) => (
                    <div key={medalKey} className="insignia">
                      <img
                        src={`/insignias/${medalKey}.png`}
                        alt={medalKey}
                      />
                      <span className="tooltip-text">
                        {/* Aquí puedes poner un mapeo de leyendas según medalKey */}
                        {medalKey.replace("modulo", "Módulo ")} Completado
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="sin-medallas">
                    Aún no has reclamado ninguna medalla.
                  </p>
                )}
              </div>
            </div>
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
