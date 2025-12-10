import axios from 'axios'
const API_URL = 'https://preguntados-api.vercel.app/api'

export const getDifficulties = async () => {
    return await axios.get(`${API_URL}/difficulty`)
    .then(response => response.data)
    .catch((error) => {
        throw new Error(error.response.data.message || 'Error al obtener las dificultades');
    })
}

export const getQuestions = async (difficulty) => {
    return await axios.get(`${API_URL}/questions?difficulty=${difficulty}`)
    .then(response => response.data)
    .catch((error) => {
        throw new Error(error.response.data.message || 'Error al obtener las preguntas');
    })
}

export const getResponse = async (option, questionId) => {
    return await axios.post(`${API_URL}/answer`, { questionId, option  })
    .then(response => response.data)
    .catch((error) => {
        throw new Error(error.response.data.message || 'Error al obtener la respuesta');
    })
}