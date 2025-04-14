import React, { useEffect, useState } from "react";
import "./LoadingScreen.css"; // Estiliza tu pantalla de carga

function LoadingScreen({ setIsLoading }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false); // Estado para controlar la disolución de salida

  useEffect(() => {
    const totalDuration = 3000; // Duración total en ms
    const intervalDuration = 100; // Intervalo de actualización en ms
    const step = 100 / (totalDuration / intervalDuration); // Incremento en cada paso

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100));
    }, intervalDuration);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true); // Activa la disolución de salida
      setTimeout(() => setIsLoading(false), 1000); // Espera a que la disolución termine antes de desmontar
    }, totalDuration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [setIsLoading]);

  return (
    <div className={`loading-screen ${isFadingOut ? "fade-out" : "fade-in"}`}>
      <div className="loading-navbar-logo">
        <div className="loading-navbar-logo-finverse"></div>
      </div>
      <h2>La familia Torres y sus hábitos financieros</h2>
      <p>Cargando...</p>
      <div className="loading-desafio-progress-bar">
        <div
          className="loading-desafio-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
