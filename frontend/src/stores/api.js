import { defineStore } from 'pinia'
import axios from 'axios'
import { inject, ref } from 'vue'

export const useAPIStore = defineStore('api', () => {
  const API_BASE_URL = inject('apiBaseURL')
  const token = ref()

  const postLogin = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials)
    token.value = response.data.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    return response.data.user
  }

  const postLogout = async () => {
    await axios.post(`${API_BASE_URL}/logout`)
    token.value = undefined
    delete axios.defaults.headers.common['Authorization']
  }

  const getAuthUser = () => {
    return axios.get(`${API_BASE_URL}/users/me`)
  }

  return {
    postLogin,
    postLogout,
    getAuthUser,
  }
})
