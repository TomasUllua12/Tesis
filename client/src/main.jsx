/* ============================================================
   Archivo: client/main.jsx
   ============================================================ */

/*******************************
 * 1) IMPORTS NUCLEO REACT     *
 *******************************/
import React from "react";
import ReactDOM from "react-dom/client";

/*******************************
 * 2) LIBRERÍA DE RUTEO        *
 *******************************/
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/*******************************
 * 3) MÓDULOS DE APLICACIÓN    *
 *******************************/
import App from "./App.jsx";

// Vistas
import { Aprender } from "./views/Aprender.jsx";
import { Etapa1 } from "./views/Etapas/Etapa1.jsx";
import { Detalles1 } from "./views/Etapas/Detalles1.jsx";
import { Perfil } from "./views/Perfil.jsx";
import { Desafios } from "./views/Desafios.jsx";
import { Tienda } from "./views/Tienda.jsx";
import Capitulo1 from "./views/Etapas/Capitulo1.jsx";
import Capitulo2 from "./views/Etapas/Capitulo2.jsx";
import { Login } from "./views/Login.jsx";
import Retroalimentacion1 from "./views/Etapas/Retroalimentacion1.jsx";
import ResumenCapitulo from "./views/Etapas/ResumenCapitulo.jsx";

// Proveedor de estado global para tema oscuro
import { DarkModeProvider } from "./context/DarkModeContext";

/*******************************
 * 4) ESTILOS GLOBALES         *
 *******************************/
import "./index.css";

/*******************************
 * 5) CONFIGURACIÓN DE RUTAS   *
 *******************************/
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "login", element: <Login /> },
  { path: "aprender", element: <Aprender /> },
  { path: "aprender/etapa1", element: <Etapa1 /> },
  { path: "aprender/detalles1", element: <Detalles1 /> },
  { path: "perfil", element: <Perfil /> },
  { path: "desafios", element: <Desafios /> },
  { path: "tienda", element: <Tienda /> },
  { path: "aprender/etapa1/capitulo1", element: <Capitulo1 /> },
  { path: "aprender/etapa1/retroalimentacion1", element: <Retroalimentacion1 /> },
  { path: "aprender/etapa1/capitulo2", element: <Capitulo2 /> },
  { path: "aprender/etapa1/:capKey/resumen", element: <ResumenCapitulo /> },
]);

/*******************************
 * 6) RENDERIZADO              *
 *******************************/
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </React.StrictMode>
);