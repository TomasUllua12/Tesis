import React, { useState } from "react";

export function ImageButton({ state }) {
  // Estado para manejar el cambio de imagen
  const [imageSrc, setImageSrc] = useState("/Buttons/ButtonPlay.png"); // Imagen inicial

  // Funciones para cambiar la imagen al pasar el mouse
  const handleMouseEnter = () => {
    setImageSrc("/Buttons/ButtonPlayPress.png"); // Imagen al pasar el mouse
  };

  const handleMouseLeave = () => {
    setImageSrc("/Buttons/ButtonPlay.png"); // Imagen cuando se quita el mouse
  };

  return (
    <button
      className=""
      onMouseDown={handleMouseEnter}
      onMouseUp={handleMouseLeave}
      style={{
        background: "none",
        border: "none",
        padding: "0",
        width: "auto",
        height: "auto",
      }}
    >
      <img
        src={imageSrc}
        alt="Botón"
        style={{
          width: "100px",
          height: "auto",
          filter: state === "Block" ? "grayscale(100%)" : "none",
          cursor: state === "Block" ? "not-allowed" : "pointer"
        }}
      />
    </button>
  );
}
