// Client/components/Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export function Navbar(props) {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const darkModePurchased =
    user &&
    user.purchased_improvements &&
    user.purchased_improvements.includes("dark_mode");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={darkMode ? "navbar-bg-dark" : "navbar-bg"}>
      <div className="navbar-logo">
        <div className="navbar-logo-finverse"></div>
      </div>

      <div className="navbar-opciones">
        <ul>
          <li>
            <Link to="/Aprender">
              <img
                src="../../public/logo-learn.png"
                alt="Logo"
                className="link-icon"
              />
              APRENDER
            </Link>
          </li>
          <li>
            <Link to="/Desafios">
              <img
                src="../../public/logo-challenge.png"
                alt="Logo"
                className="link-icon"
              />
              DESAFÍOS
            </Link>
          </li>
          <li>
            <Link to="/Tienda">
              <img
                src="../../public/logo-shop.png"
                alt="Logo"
                className="link-icon"
              />
              TIENDA
            </Link>
          </li>
          <li>
            <Link to="/Perfil">
              <img
                src="../../public/logo-perfil.png"
                alt="Logo"
                className="link-icon"
              />
              PERFIL
            </Link>
          </li>
        </ul>
      </div>

      {darkModePurchased && (
        <div className="navbar-darkmode-toggle">
          <button className="darkmode-button" onClick={toggleDarkMode}>
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>
      )}

      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
