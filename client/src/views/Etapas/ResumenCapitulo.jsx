// Client/views/ResumenCapitulo.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ResumenCapitulo.css";

export default function ResumenCapitulo() {
  const { capKey } = useParams(); // "capitulo1", "capitulo2", etc.

  // Map de resúmenes estáticos. Completa cada uno con tu texto.
  const summaries = {
    capitulo1: `María recibe una herencia inesperada y debe decidir
cómo administrarla: opciones de ahorro, inversión y peligros
de gastar sin planificación.`,
    capitulo2: `Julio quiere comprarse una moto sin afectar
las finanzas familiares: importancia de metas claras,
plazos y opciones de financiamiento.`,
    capitulo3: `Lucía organiza el presupuesto del hogar:
registra ingresos y egresos, detecta fugas de dinero
y aplica métodos de control.`,
    capitulo4: `Ramón lucha por mantener el hábito de ahorrar:
fondo de emergencia, técnicas para automatizar
el ahorro y vencer la tentación.`,
    capitulo5: `Paola estrena su primera tarjeta de crédito:
tasas de interés, pago mínimo vs total y cuidados
para evitar sobreendeudamiento.`,
    // añade más capítulos si los tienes...
  };

  // Selecciona el texto según capKey o un fallback
  const summaryText =
    summaries[capKey] ||
    `No hay resumen disponible para ${capKey.replace(
      "capitulo",
      "Capítulo "
    )}.`;

  return (
    <div className="resumen-view">
      <h2>Resumen de {capKey.replace("capitulo", "Capítulo ")}</h2>
      <div className="resumen-content">
        <p>{summaryText}</p>
      </div>
      <Link to="/Aprender/Etapa1" className="btn-volver">
        ← Volver a Módulo 1
      </Link>
    </div>
  );
}
