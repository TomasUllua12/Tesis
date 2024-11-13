import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export function Navbar(props) {
  return (
    <>
      <div className="navbar-bg">
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
      </div>
    </>
  );
}
