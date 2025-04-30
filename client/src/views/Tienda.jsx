// Client/views/Tienda.jsx
import React, { useEffect, useState, useContext } from "react";
import "./Tienda.css";
import { Chat } from "../components/Chat";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { Mejora } from "../components/Mejora";
import { MainHeader } from "../components/MainHeader";
import { DarkModeContext } from "../context/DarkModeContext";

export function Tienda() {
  const [user, setUser] = useState(null);

  const { darkMode } = useContext(DarkModeContext);

  // Función para actualizar el usuario leyendo del localStorage
  const updateUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  // Función para verificar si el usuario ha comprado una mejora
  const hasPurchased = (key) => {
    return user &&
           user.purchased_improvements &&
           user.purchased_improvements.includes(key);
  };

  return (
    <div>
      <div className="color-line"></div>
      <div className="general-view">
        <Navbar />
        <div className="general-main">
          <MainHeader title="Tienda" />

          <div className="content-tienda">
            <Mejora
              titulo="Modo Oscuro"
              image="/public/Mejoras/ModoOscuro.png"
              price={1000}
              improvementKey="dark_mode"
              purchased={hasPurchased("dark_mode")}
              updateUser={updateUser}
              info="Cambia la interfaz a un diseño más amigable para la vista en ambientes oscuros."
            />
            <Mejora
              titulo="Voz Premium"
              image="/public/Mejoras/MejoraVoz.png"
              price={350}
              improvementKey="mejora_1"
              purchased={hasPurchased("mejora_1")}
              updateUser={updateUser}
              info="Activa narraciones con voces más naturales y expresivas en los escenarios."
            />
            <Mejora
              titulo="Estadísticas Plus"
              image="/public/Mejoras/MejoraStats.png"
              price={100}
              improvementKey="mejora_2"
              purchased={hasPurchased("mejora_2")}
              updateUser={updateUser}
              info="Acceso a un panel de estadísticas más detalladas sobre tu progreso, decisiones y logros."
            />
            <Mejora
              titulo="Multiplicador XP"
              image="/public/Mejoras/MejoraXP.png"
              price={450}
              improvementKey="mejora_3"
              purchased={hasPurchased("mejora_3")}
              updateUser={updateUser}
              info="Duplica la experiencia obtenida por un tiempo limitado."
            />
            <Mejora
              titulo="Nivel Secreto"
              image="/public/Mejoras/MejoraNivel.png"
              price={700}
              improvementKey="mejora_4"
              purchased={hasPurchased("mejora_4")}
              updateUser={updateUser}
              info="Desbloquea un capítulo oculto con un desafío especial o historia exclusiva."
            />
            <Mejora
              titulo="Desbloqueo Anticipado"
              image="/public/Mejoras/MejoraAcceso.png"
              price={150}
              improvementKey="mejora_5"
              purchased={hasPurchased("mejora_5")}
              updateUser={updateUser}
              info="Abre módulos o capítulos sin necesidad de haber completado los anteriores."
            />
            <Mejora
              titulo="Consejo Dorado"
              image="/public/Mejoras/MejoraConsejo.png"
              price={150}
              improvementKey="mejora_5"
              purchased={hasPurchased("mejora_5")}
              updateUser={updateUser}
              info="Obtén una recomendación personalizada basada en tu perfil y decisiones pasadas."
            />
            <Mejora
              titulo="Spoiler Financiero"
              image="/public/Mejoras/MejoraSpoiler.png"
              price={150}
              improvementKey="mejora_5"
              purchased={hasPurchased("mejora_5")}
              updateUser={updateUser}
              info="Vista previa de posibles consecuencias futuras antes de tomar una decisión clave."
            />
          </div>
          <div className="general-main-pie">
          <img src={darkMode ? "../../public/FinverseLogoDark.png" : "../../public/FinverseLogoLight.png"} alt="Finverse Logo" />
            <div className="links-container">
              <Link to="/Aprender">Aprender</Link>
              <Link to="/Desafios">Desafíos</Link>
              <Link to="/Tienda">Tienda</Link>
              <Link to="/Perfil">Perfil</Link>
            </div>
            <p>Copyrights © 2024 Finverse. Todos los derechos reservados.</p>
          </div>
        </div>
        <Chat />
      </div>
    </div>
  );
}
