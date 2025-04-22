/* ============================================================
   Archivo: App.jsx
   ============================================================ */

import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className='app-bg'>
      <div className='app-todo'>
        <div className='cuadrado'>
          <p className='app-p'>Bienvenido a</p>
          <img
            className="app-logo"
            src="../public/FinverseLogoDark.png" 
            alt="Logo Finverse"
          />
          <p className='app-p'>Cada decisión cuenta. Empieza a tomar el control de tu vida financiera.</p>
          <Link to="Login">
            <h2>Ingresar</h2>
          </Link>
        </div>
      </div>
      <div className='app-img'></div>
    </div>
  );
}

export default App;
