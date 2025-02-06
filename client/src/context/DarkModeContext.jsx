// Client/context/DarkModeContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  // Inicializamos el estado leyendo de localStorage
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Actualizamos la clase del body cada vez que cambia darkMode
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
