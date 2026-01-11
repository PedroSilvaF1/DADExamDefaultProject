import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/login/LoginPage.vue'
import HomePage from '@/pages/home/HomePage.vue'
import WebSocketTestPage from '@/pages/tests/WebSocketTestPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/websocket-test',
      component: WebSocketTestPage,
    },
  ],
})

export default router
