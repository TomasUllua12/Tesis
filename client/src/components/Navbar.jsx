// Client/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export function Navbar(props) {
  const navigate = useNavigate();

  // Leer el usuario del localStorage para saber si tiene dark mode
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const handleLogout = () => {
    // Eliminar los datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirigir al login
    navigate("/login");
  };

  return (
    <div className="navbar-bg">
      <div className="navbar-logo">
        <div className="navbar-logo-finverse"></div>
      </div>

      {/* Sección para opciones */}
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

      {/* Si el usuario compró dark mode, se muestra el toggle en el Navbar */}
      {darkModePurchased && (
        <div className="navbar-darkmode-toggle">
          <button className="darkmode-button" onClick={toggleDarkMode}>
            {darkMode ? "Modo Claro" : "Modo Oscuro"}
          </button>
        </div>
      )}

      {/* Botón de cierre de sesión en la parte inferior */}
      <div className="navbar-logout">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
