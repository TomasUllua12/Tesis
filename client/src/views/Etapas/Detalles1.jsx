import React, { useRef, useContext } from "react";
import "./Detalles1.css";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { Navbar } from "../../components/Navbar";
import { Chat } from "../../components/Chat";
import { MainHeader } from "../../components/MainHeader";
import { DarkModeContext } from "../../context/DarkModeContext";

export function Detalles1() {

  const { darkMode } = useContext(DarkModeContext);

  // Creamos una referencia para apuntar al contenido que será leído
  const detailsRef = useRef(null);

  // Usamos el hook para reproducir la voz al presionar Espacio
  // Retorna el texto extraído desde 'detailsRef'
  useTextToSpeech(() => detailsRef.current?.innerText || "");

  // Función para volver a la pantalla de "Aprender" (puedes cambiar la ruta)
  const handleVolverAprender = () => {
    window.location.href = "/Aprender";
  };

  return (
    <div>
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
              En este primer módulo se sientan las bases para una buena
              educación financiera. A través de ocho casos reales, conocerás
              situaciones cotidianas en las que se pone a prueba la capacidad de
              administrar el dinero y tomar decisiones responsables. El objetivo
              es que al finalizar el módulo tengas las herramientas necesarias
              para elaborar un presupuesto, definir metas financieras, entender
              la dinámica del crédito y la importancia del ahorro. Además,
              aprenderás a reconocer diferentes tipos de inversión sencilla y
              desarrollar hábitos saludables que te acompañarán en toda tu vida
              financiera.
            </p>

            <h2>¿Qué temas se abarcan en el Módulo 1?</h2>
            <ul>
              <li>
                <strong>Manejo del dinero al recibir sumas inesperadas:</strong>{" "}
                cómo proceder si recibes una herencia u otro capital
                extraordinario.
              </li>
              <li>
                <strong>Definición de objetivos financieros:</strong> cómo
                trazar metas a corto, mediano y largo plazo, y por qué son
                cruciales para planificar tu economía.
              </li>
              <li>
                <strong>Creación y manejo de presupuestos:</strong> aprenderás a
                distribuir tus ingresos en gastos fijos, variables y ahorro,
                evitando así la fuga de dinero.
              </li>
              <li>
                <strong>Hábito del ahorro:</strong> entenderás métodos para
                ahorrar de forma constante y cómo crear un fondo de emergencia.
              </li>
              <li>
                <strong>Crédito y endeudamiento:</strong> uso responsable de
                tarjetas de crédito, préstamos y manejo de tasas de interés.
              </li>
              <li>
                <strong>Introducción a la inversión básica:</strong> conocerás
                opciones sencillas para poner a trabajar tus ahorros sin asumir
                riesgos desmedidos.
              </li>
              <li>
                <strong>Hábitos financieros saludables:</strong> consejos para
                mantener un orden estable en tus finanzas personales, fomentando
                la disciplina y la planificación.
              </li>
            </ul>

            <h2>¿Por qué es importante este módulo?</h2>
            <p className="p-aux">
              <strong>Fundamentos sólidos:</strong> Este módulo constituye la
              base para entender tus propias finanzas y sentar un camino
              ordenado hacia objetivos mayores.
            </p>
            <p className="p-aux">
              <strong>Seguridad y confianza:</strong> Saber administrar tus
              ingresos y controlar tus gastos te permitirá tomar decisiones más
              seguras y estables.
            </p>
            <p className="p-aux">
              <strong>Primera etapa para inversiones y emprendimiento:</strong>{" "}
              Antes de incursionar en inversiones más complejas o proyectos
              propios, es fundamental saber manejar el día a día financiero.
            </p>
            <p className="p-aux">
              Con este primer módulo, estarás listo para avanzar hacia los
              módulos siguientes, en los que aprenderás a hacer crecer tu
              patrimonio, protegerlo y, si lo deseas, emprender con una visión
              financiera sólida.
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
