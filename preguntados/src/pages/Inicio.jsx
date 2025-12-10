import './Inicio.css'
import preguntados from '../assets/preguntados.png'
import { useNavigate } from 'react-router'
import '../App.css'

function Inicio() {
    const navigate = useNavigate() 

    console.log('Inicio cargado, imagen importada:', preguntados)

    return (
        <div className="inicio-page">
            <img className= "fondo-preguntados" src={preguntados} alt= "fondo-preguntados" />
            <button className="btn-jugar" onClick={() => navigate('/seleccionarDificultad')}>JUGAR</button>
        </div>
    )
}

export default Inicio;