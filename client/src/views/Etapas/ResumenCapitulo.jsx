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
      <Link to="/Aprender/Etapa1" className="btn-volver">
        ← Volver a Módulo 1
      </Link>

      <h1 className="resumen-h1">🧠 ¿Qué aprendimos con "La Familia Torres"?</h1>

      <h2 className="resumen-h2">💸 1. Identificación de gastos fijos, variables e innecesarios</h2>
      <p className="resumen-p">
        Entender en qué gastamos nuestro dinero es el primer paso para tomar
        decisiones más inteligentes.
      </p>
      <ul className="resumen-ul">
        <li className="resumen-li">
          <strong>Gastos fijos:</strong> alquiler, servicios,
          colegio.
        </li>
        <li className="resumen-li">
          <strong>Gastos variables:</strong> comida, salidas, ropa, regalos.
        </li>
        <li className="resumen-li">
          <strong>Gastos innecesarios:</strong> delivery excesivo, compras
          impulsivas, suscripciones sin uso.
        </li>
      </ul>
      <div class="consejo">
        👉 Consejo: Clasificar tus gastos te ayuda a saber por dónde ajustar sin
        sacrificar tu bienestar.
      </div>

      <h2 className="resumen-h2">🧾 2. Registro de gastos y presupuesto familiar</h2>
      <p className="resumen-p">
        Un presupuesto te permite planificar el mes, anticiparte a los gastos y
        evitar sorpresas.
      </p>
      <ul className="resumen-ul">
        <li className="resumen-li">Anotá tus ingresos mensuales.</li>
        <li className="resumen-li">Sumá tus gastos estimados.</li>
        <li className="resumen-li">Compará: ¿te alcanza? ¿podés ahorrar?</li>
        <li className="resumen-li">Ajustá según lo necesario.</li>
      </ul>

      <h3 className="resumen-h3">📊 Método 50/30/20 (presupuesto simplificado)</h3>
      <p className="resumen-p">
        Fue popularizado por la senadora y experta en derecho financiero estadounidense Elizabeth Warren. Propone dividir los ingresos en tres partes para lograr equilibrio financiero de forma sencilla.
      </p>
      <table className="resumen-table">
        <tr className="resumen-tr">
          <th className="resumen-th">Categoría</th>
          <th className="resumen-th">Porcentaje</th>
          <th className="resumen-th">Ejemplos</th>
        </tr>
        <tr className="resumen-tr">
          <td className="resumen-td">Necesidades</td>
          <td className="resumen-td">50%</td>
          <td className="resumen-td">Comida, alquiler, servicios</td>
        </tr>
        <tr className="resumen-tr">
          <td className="resumen-td">Gustos</td>
          <td className="resumen-td">30%</td>
          <td className="resumen-td">Salidas, ocio, caprichos</td>
        </tr>
        <tr className="resumen-tr">
          <td className="resumen-td">Ahorro</td>
          <td className="resumen-td">20%</td>
          <td className="resumen-td">Fondo de emergencia, inversiones</td>
        </tr>
      </table>
      <div class="consejo">
        👉 Consejo: Este método es simple y flexible. Te da estructura sin ser
        rígido.
      </div>

      <h2 className="resumen-h2">🐜 3. Gastos hormiga y micro decisiones cotidianas</h2>
      <p className="resumen-p">
        Los pequeños gastos diarios que parecen insignificantes pueden hacer un
        gran daño al presupuesto mensual.
      </p>
      <ul className="resumen-ul">
        <li className="resumen-li">
          <strong>Ejemplos:</strong> Cafecitos, snacks, apps, taxis cortos,
          compras de kiosco.
        </li>
        <li className="resumen-li">
          <strong>
            Un gasto de $2000 al día puede sumar más de $60.000 al mes.
          </strong>
        </li>
      </ul>
      <div class="consejo">
        👉 Consejo: No se trata de decir que no, sino de decidir mejor. Cada
        micro decisión cuenta.
      </div>

      <div class="resumen-final">
        <h2 className="resumen-h2">✅ En resumen…</h2>
        <ul className="resumen-ul">
          <li className="resumen-li">✔️ Clasificá tus gastos para entender tu situación real.</li>
          <li className="resumen-li">✔️ Hacé un presupuesto mensual adaptado a tus posibilidades.</li>
          <li className="resumen-li">✔️ Probá el método 50/30/20 para organizar sin complicarte.</li>
          <li className="resumen-li">
            ✔️ Revisá los pequeños gastos: son más poderosos de lo que parecen.
          </li>
        </ul>
      </div>
    </div>
  );
}
