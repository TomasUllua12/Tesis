import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Aprender } from "./views/Aprender.jsx";
import { Etapa1 } from "./views/Etapas/Etapa1.jsx";
import {Detalles1} from "./views/Etapas/Detalles1.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "Aprender", element: <Aprender /> },
  { path: "Aprender/Etapa1", element: <Etapa1 /> },
  {
    path: "Aprender/Detalles1",
    element: <Detalles1 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
