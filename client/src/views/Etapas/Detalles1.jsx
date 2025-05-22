import React, { useRef, useContext, useEffect, useState } from "react";
import "./Detalles1.css";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { MainHeader } from "../../components/MainHeader";
import { DarkModeContext } from "../../context/DarkModeContext";

export function Detalles1() {
  const { darkMode } = useContext(DarkModeContext);

  // Referencia al contenido a leer
  const detailsRef = useRef(null);

  // Hook de texto a voz
  useTextToSpeech(() => detailsRef.current?.innerText || "");

  // Redirección a /Aprender
  const handleVolverAprender = () => {
    window.location.href = "/Aprender";
  };

  // Estado para mostrar el cartel de ayuda
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000); // se oculta a los 5 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Cartel flotante */}
      {showHint && (
        <div
          style={{
            position: "fixed",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 136, 0)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(255, 136, 0, 0.2)",
            fontFamily: 'Kode Mono'
          }}
        >
          Presioná Shift derecho para escuchar el texto en voz alta 🎧
        </div>
      )}

      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Detalles del Módulo 1" />

          <div className="details-1" ref={detailsRef}>
            <img
              src="../../public/Detalles1tesis.png"
              className="imagen-detail"
              alt="Imagen del Módulo 1"
            />
            <h1>PRINCIPIOS DE LAS FINANZAS PERSONALES</h1>
            <p>
              En este primer módulo se introducen los fundamentos clave para lograr una vida financiera ordenada y consciente. A través de ocho historias con decisiones interactivas, irás descubriendo los errores más comunes en el manejo del dinero y cómo evitarlos. Cada capítulo te presenta un caso diferente, con situaciones que podrías vivir en cualquier momento de tu vida. A medida que avances, aprenderás a observar tus hábitos, organizar tus gastos, planificar mejor y tomar decisiones más informadas.
            </p>

            <h2>¿Qué temas se abarcan en el Módulo 1?</h2>
            <ul>
              <li>
                <strong>Cómo organizar tu presupuesto y clasificar tus gastos.</strong>
              </li>
              <li>
                <strong>Qué hacer cuando recibís una suma inesperada, como una herencia.</strong>
              </li>
              <li>
                <strong>La importancia de definir objetivos financieros claros.</strong>
              </li>
              <li>
                <strong>Estrategias para ahorrar todos los meses, incluso con ingresos ajustados.</strong>
              </li>
              <li>
                <strong>El uso responsable del crédito y el entendimiento de las tasas de interés.</strong>
              </li>
              <li>
                <strong>Primeros pasos en inversiones simples y seguras.</strong>
              </li>
              <li>
                <strong>Cómo mantener hábitos financieros saludables a lo largo del tiempo.</strong>
              </li>
              <li>
                <strong>Por qué es importante involucrar a tu familia en las decisiones económicas.</strong>
              </li>
            </ul>

            <h2>¿Por qué es importante este módulo?</h2>
            <p className="p-aux">
              <strong>Te da las bases</strong> para entender tu economía personal desde cero.
            </p>
            <p className="p-aux">
              <strong>Te ayuda a evitar errores comunes</strong> que causan estrés financiero.
            </p>
            <p className="p-aux">
              <strong>Te prepara para decisiones más complejas,</strong>{" "}
              como invertir o emprender, con mayor seguridad.
            </p>
            <p className="p-aux">
              Con este módulo vas a comenzar a ver el dinero no solo como un recurso, sino como una herramienta para construir una vida más ordenada, libre y alineada con tus objetivos.
            </p>

            {/* Botón para volver a la pantalla de "Aprender" */}
            <button className="btn-regresar" onClick={handleVolverAprender}>
              Volver
            </button>
          </div>
          <div className="card-detalles"></div>
          <div className="general-main-pie"></div>
        </div>
        <Chat />
      </div>
    </div>
  );
}
