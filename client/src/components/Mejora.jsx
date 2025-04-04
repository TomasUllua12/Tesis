// Client/components/Mejora.jsx
import React, { useState, useEffect } from "react";
import "./mejora.css";
import { useNavigate } from "react-router-dom";

export function Mejora(props) {
  const [purchased, setPurchased] = useState(props.purchased);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Sincronizamos el estado local con la prop para que, al volver a la tienda,
  // se refleje si la mejora ya fue adquirida.
  useEffect(() => {
    setPurchased(props.purchased);
  }, [props.purchased]);

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
        // Actualizamos la información del usuario en localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        setPurchased(true);
        // Llamamos a updateUser para que el componente padre actualice su estado
        if (props.updateUser) {
          props.updateUser();
        }
      }
    } catch (err) {
      setError("Error en la conexión");
    }
    setBuying(false);
  };

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
        {/* Solo se muestran las monedas y el precio si la mejora no ha sido adquirida */}
        {!purchased && (
          <div className="mejora-precio">
            <p>
              <span>
                <img src="/public/Coin.gif" alt="Coins" className="gif-span" />
              </span>
              {props.price}
            </p>
          </div>
        )}
        <div className="mejora-boton-container">
          {!purchased ? (
            <button className="mejora-boton" onClick={handleBuy} disabled={buying}>
              {buying ? "Comprando" : "Comprar"}
            </button>
          ) : (
            <span className="adquirido-text">ADQUIRIDO</span>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
