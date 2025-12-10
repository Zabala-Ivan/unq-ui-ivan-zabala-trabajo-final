import './App.css'
import Inicio from './pages/Inicio'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SeleccionarDificultad from './pages/SeleccionarDificultad'
import Juego from './pages/Juego'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/seleccionarDificultad" element={<SeleccionarDificultad />} />
          <Route path="/Juego" element={<Juego />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
