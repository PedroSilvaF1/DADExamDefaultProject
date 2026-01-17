import {defineStore} from 'pinia'
import axios from 'axios'
import {inject, ref} from 'vue'

export const useAPIStore = defineStore('api', () => {
    const API_BASE_URL = 'http://localhost:8000/api'
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

    const changePassword = (passwordData) => {
        return axios.patch(`${API_BASE_URL}/users/me/password`, passwordData)
    }

    // --- Métodos para Notas ---
    const getNotes = () => {
        return axios.get(`${API_BASE_URL}/notes`)
    }

    const createNote = (noteData) => {
        return axios.post(`${API_BASE_URL}/notes`, noteData)
    }

    // metodos para produtos

    const getProducts = (filter = null) => {
        if (filter == null){
            return axios.get(`${API_BASE_URL}/products`)
        }
        return axios.get(`${API_BASE_URL}/products/?filter=${filter}`)
    }

    const addProduct = (productData) => {
        return axios.post(`${API_BASE_URL}/products`, productData)
    }

    const updateNameProducts = (id, name) => {
        return axios.patch(`${API_BASE_URL}/products/${id}`, {"name":name})
    }

    const createPurchase = (cartData) => {
        return axios.post(`${API_BASE_URL}/purchases`, cartData)
    }

    return {
        token,
        postLogin,
        postLogout,
        getAuthUser,
        changePassword,
        getNotes,
        createNote,
        getProducts,
        addProduct,
        updateNameProducts,
        createPurchase
    }
})
