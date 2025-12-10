import './SeleccionarDificultad.css'
import fondoPasto from '../assets/fondoPasto.png'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { useEffect, useState } from 'react'
import { getDifficulties } from '../_services/api'

const difficultiesTranslated = {
  easy: 'Fácil',
  normal: 'Normal',
  hard: 'Difícil',
  extreme: 'Extremo',
}

function DifficultySelector() {
    const navigate = useNavigate()
    const [difficultySelected, setDifficultySelected] = useState()
    const [difficulties, setDifficulties] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      setIsLoading(true)
      getDifficulties()
      .then(setDifficulties)
      .catch((error) => console.error(error.message))
      .finally(() => setIsLoading(false))
    }, [])

    return (
      <div className="inicio-page">
        <img className="fondo-preguntados" src={fondoPasto} alt="fondo-preguntados" />
        <div className="content">
            <div className="difficulty-selection-container">
              <span className="difficulty-title">DIFICULTAD</span>
              <div>
                {isLoading ? <h1>Cargando...</h1> : difficulties.map((difficulty, index) => (
                  <button key={index} className={difficulty === difficultySelected
                    ? 'selection-buttom selection-buttom-selected'
                    : 'selection-buttom'
                  }
                  onClick={() => setDifficultySelected(difficulty)}>
                    {difficultiesTranslated[difficulty]}
                  </button>
                ))}
              </div>
            </div>

            <span className="send-button-container">
              <button className={difficultySelected
                 ? 'send-button send-button-enabled'
                 : 'send-button'
              }
              onClick={() => difficultySelected && navigate(`/Juego?difficulty=${difficultySelected}`, { replace: true })
              }
              >
                INICIAR
              </button>
            </span>
        </div>
      </div>
    )
}

export default DifficultySelector

    