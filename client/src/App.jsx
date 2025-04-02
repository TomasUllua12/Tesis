import './App.css'
import { Link } from "react-router-dom"

function App() {

  return (
    <>
    <div className='app-bg'>
      <div className='app-todo'>
        <div className='cuadrado'>
          <p className='app-p'>Bienvenidos a</p>
          <img className="app-logo" src="../public/FinverseLogoDark.png" alt="" />
          <p className='app-p'>Lorem, ipsum dolor sit amet te aut impedit molestiae excepturi?</p>
          <Link to="Login"><h2>Ingresar</h2></Link>
        </div>
      </div>
      <div className='app-img'></div>
    </div>
    </>
  )
}

export default App
