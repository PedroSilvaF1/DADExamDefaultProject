import { defineStore } from 'pinia'
import axios from 'axios'
import { inject, ref } from 'vue'

export const useAPIStore = defineStore('api', () => {
  const API_BASE_URL = inject('apiBaseURL')
  const token = ref(sessionStorage.getItem('token'))

  // Se já houver token guardado, configura o axios imediatamente
  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const postLogin = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials)
    token.value = response.data.token
    
    // Guardar token e configurar axios
    sessionStorage.setItem('token', token.value)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    
    return response.data.user
  }

  const postLogout = async () => {
    try {
        await axios.post(`${API_BASE_URL}/logout`)
    } catch (e) {
        // Ignora erro se logout falhar (ex: token já inválido)
    }
    token.value = undefined
    sessionStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }

  const getAuthUser = () => {
    return axios.get(`${API_BASE_URL}/users/me`)
  }

  // --- Métodos para Notas ---
  const getNotes = () => {
    return axios.get(`${API_BASE_URL}/notes`)
  }

  const createNote = (noteData) => {
    return axios.post(`${API_BASE_URL}/notes`, noteData)
  }

  return {
    token,
    postLogin,
    postLogout,
    getAuthUser,
    getNotes,
    createNote,
  }
})
