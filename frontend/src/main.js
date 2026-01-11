import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { io } from 'socket.io-client'

import App from './App.vue'
import router from './router'

const apiDomain = import.meta.env.VITE_API_DOMAIN || 'localhost:8000'
const wsConnection = import.meta.env.VITE_WS_CONNECTION || 'http://localhost:3000'
const studentName = import.meta.env.VITE_STUDENT_NAME || 'Unknown Student'
const studentNumber = import.meta.env.VITE_STUDENT_NUMBER || 'XXXXXXX'


const app = createApp(App)

app.provide('socket', io(wsConnection))
app.provide('serverBaseURL', `http://${apiDomain}`)
app.provide('apiBaseURL', `http://${apiDomain}/api`)
app.provide('studentName', studentName)
app.provide('studentNumber', studentNumber)

app.use(createPinia())

app.use(router)

app.mount('#app')
