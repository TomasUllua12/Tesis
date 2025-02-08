// Client/components/MainHeader.jsx
import React, { useEffect, useState, useContext } from "react";
import "./MainHeader.css"; // Puedes reutilizar estilos o crear uno nuevo
import { DarkModeContext } from "../context/DarkModeContext";

export function MainHeader({ title }) {
  const [user, setUser] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="general-main-encabezado">
      <h2>{title}</h2>
      <div className="perfil-expmon-header">
        <p>
          <span className="exp-text">Exp</span> {user ? user.experience : 0} -{" "}
          <b></b>
          <span>
            <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
          </span>
          {user ? user.coins : 0}
        </p>
      </div>
    </div>
  );
}
