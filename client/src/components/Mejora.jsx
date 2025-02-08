// Client/components/Mejora.jsx
import React, { useState, useContext } from "react";
import "./mejora.css";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export function Mejora(props) {
  // El estado inicial de "purchased" se establece a partir de la prop recibida
  const [purchased, setPurchased] = useState(props.purchased);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBuy = async () => {
    setBuying(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/buy-improvement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          improvementKey: props.improvementKey,
          price: props.price
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al comprar la mejora");
      } else {
        // Actualizar la información del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        setPurchased(true);
        // Llamar a updateUser (si fue pasada) para que el padre actualice su estado
        if (props.updateUser) {
          props.updateUser();
        }
      }
    } catch (err) {
      setError("Error en la conexión");
    }
    setBuying(false);
  };

  // Para cualquier mejora que no sea dark_mode se muestra el botón Comprar/Comprada.
  // Para dark_mode, si ya fue comprada, se muestra "Comprada" ya que el toggle se muestra en el Navbar.
  return (
    <div className="mejora-card">
      <div className="mejora-titulo">
        <p>{props.titulo}</p>
      </div>
      <div className="mejora-card-der">
        <img
          src={props.image}
          alt="Imagen Mejora"
          className={`mejora-card-der-img ${!purchased ? "blocked" : ""}`}
        />
      </div>
      <div className="mejora-card-izq">
        <div className="mejora-precio">
          <p>
            <span>
              <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
            </span>
            {props.price}
          </p>
        </div>
        <div className="mejora-boton-container">
          {!purchased ? (
            <button className="mejora-boton" onClick={handleBuy} disabled={buying}>
              {buying ? "Comprando..." : "Comprar"}
            </button>
          ) : (
            // Para dark_mode, mostramos simplemente "Comprada" ya que el toggle aparece en el Navbar.
            props.improvementKey === "dark_mode" ? (
              <span>Comprada</span>
            ) : (
              <span>Comprada</span>
            )
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
