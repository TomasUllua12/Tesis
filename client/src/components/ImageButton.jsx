// Client/components/ImageButton.jsx
import React, { useState, useEffect } from "react";

export function ImageButton({ state }) {
  // Selecciona la imagen según el estado
  const defaultImg =
    state === "Completed"
      ? "/Buttons/ButtonPurplePlay.png"
      : "/Buttons/ButtonPlay.png";
  const pressedImg =
    state === "Completed"
      ? "/Buttons/ButtonPurplePlayPress.png"
      : "/Buttons/ButtonPlayPress.png";

  // Estado interno para la src del <img>
  const [imageSrc, setImageSrc] = useState(defaultImg);

  // Cada vez que cambie defaultImg (o sea, cambie `state`), resetea la imagen
  useEffect(() => {
    setImageSrc(defaultImg);
  }, [defaultImg]);

  const handleMouseDown = () => setImageSrc(pressedImg);
  const handleMouseUp   = () => setImageSrc(defaultImg);

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: state === "Block" ? "not-allowed" : "pointer",
      }}
      disabled={state === "Block"}
    >
      <img
        src={imageSrc}
        alt="Botón"
        style={{
          width: 100,
          height: "auto",
          filter: state === "Block" ? "grayscale(100%)" : "none",
        }}
      />
    </button>
  );
}
