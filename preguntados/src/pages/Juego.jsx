import fondoPasto from '../assets/fondoPasto.png'
import './Juego.css';       
import '../App.css'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getQuestions, getResponse } from '../_services/api'

function Juego() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const difficulty = searchParams.get('difficulty')
    const [questions, setQuestions] = useState([])
    const [questionNumber, setQuestionNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [correctas, setCorrectas] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() => {
        if (success !== null && questionNumber < questions.length) {
            setTimeout(() => {
                setSuccess(null)
                setSelectedOption(null)
                setQuestionNumber(questionNumber + 1)
            }, 1000)
        }
    }, [success, questionNumber, questions.length])

    useEffect(() => {
        setIsLoading(true)
        getQuestions(difficulty)
            .then(setQuestions)
            .finally(() => setIsLoading(false))
            .catch((error) => console.error(error.message))
    }, [difficulty])


    const selectOption = (option) => {
        if (selectedOption !== null) return

        setSelectedOption(option)
        getResponse(option, questions[questionNumber].id)
            .then((response) => {
                setSuccess(response.answer)
                if (response.answer) {
                    setCorrectas(correctas + 1)
                }
            })
            .catch((error) => console.error(error.message))
    }

    const getButtonClassName = (option) => {
        if (selectedOption === option && success !== null) {
            return success ? 'option-buttom success-color' : 'option-buttom fail-color'
        }
        return 'option-buttom'
    }

    return (
        <div className="inicio-page">
            <img className="fondo-preguntados" src={fondoPasto} alt="fondo-preguntados" />
            <div className="content">
                {isLoading ? (
                    <h1 className="question-title">Cargando...</h1>
                ) : questions.length > 0 && questionNumber < questions.length ? (
                    <div className="question-container">
                        <h1 className="question-title">{questions[questionNumber].question}</h1>
                        <div className="question-options-container">
                            <button className={getButtonClassName("option1")}
                                onClick={() => selectOption("option1")}>
                                {questions[questionNumber].option1}
                            </button>
                            <button className={getButtonClassName("option2")}
                                onClick={() => selectOption("option2")}>
                                {questions[questionNumber].option2}
                            </button>
                            <button className={getButtonClassName("option3")}
                                onClick={() => selectOption("option3")}>
                                {questions[questionNumber].option3}
                            </button>
                            <button className={getButtonClassName("option4")}
                                onClick={() => selectOption("option4")}>
                                {questions[questionNumber].option4}
                            </button>
                        </div>
                    </div>
                ) : questionNumber >= questions.length ? (
                    <div className="question-container">
                        <h1 className="question-title">Juego Terminado</h1>
                        <h1 className="question-title">Respuestas correctas: {correctas}/{questions.length}</h1>
                        <button className="restart-button" onClick={() => navigate('/difficulty-selector')}>
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">Jugar de nuevo</span>
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Juego;