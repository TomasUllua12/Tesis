import React, { useState } from "react";

export function ImageButton() {
  // Estado para manejar el cambio de imagen
  const [imageSrc, setImageSrc] = useState("../../public/Buttons/ButtonPurplePlay.png"); // Imagen inicial

  // Funciones para cambiar la imagen al pasar el mouse
  const handleMouseEnter = () => {
    setImageSrc("../../public/Buttons/ButtonPurplePlayPress.png"); // Imagen al pasar el mouse
  };

  const handleMouseLeave = () => {
    setImageSrc("../../public/Buttons/ButtonPurplePlay.png"); // Imagen cuando se quita el mouse
  };

  return (
    <button
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ background: "none", border: "none", padding: "0", width: "auto", height: "auto" }} // Sin estilos de botón
    >
      <img src={imageSrc} alt="Botón" style={{ width: "80px", height: "auto" }} />
    </button>
  );
}