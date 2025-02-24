// Client/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Aprender } from "./views/Aprender.jsx";
import { Etapa1 } from "./views/Etapas/Etapa1.jsx";
import { Detalles1 } from "./views/Etapas/Detalles1.jsx";
import { Perfil } from "./views/Perfil.jsx";
import { Desafios } from "./views/Desafios.jsx";
import { Tienda } from "./views/Tienda.jsx";
import Capitulo1 from "./views/Etapas/Capitulo1.jsx";
import { Login } from "./views/Login.jsx";
import { DarkModeProvider } from "./context/DarkModeContext"; // Importa el proveedor
import Retroalimentacion1 from "./views/Etapas/retroalimentacion1.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "Login", element: <Login /> },
  { path: "Aprender", element: <Aprender /> },
  { path: "Aprender/Etapa1", element: <Etapa1 /> },
  { path: "Aprender/Detalles1", element: <Detalles1 /> },
  { path: "Perfil", element: <Perfil /> },
  { path: "Desafios", element: <Desafios /> },
  { path: "Tienda", element: <Tienda /> },
  { path: "Capitulo1", element: <Capitulo1 /> },
  { path: "Retroalimentacion1", element: <Retroalimentacion1 /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <RouterProvider router={router} />
    </DarkModeProvider>
  </React.StrictMode>
);
