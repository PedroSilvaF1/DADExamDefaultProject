import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from '@/pages/login/LoginPage.vue'
import HomePage from '@/pages/home/HomePage.vue'
import WebSocketTestPage from '@/pages/tests/WebSocketTestPage.vue'
import NotesPage from "@/pages/notes/NotesPage.vue"
import StorePage from "@/pages/store/StorePage.vue"
import ProfilePage from "@/pages/profile/ProfilePage.vue"
import ProductsPage from "@/pages/products/ProductsPage.vue"
import CheckoutPage from "@/pages/checkout/CheckoutPage.vue"
import {useAuthStore} from "@/stores/auth.js";

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
            name: 'login',
        },
        {
            path: '/websocket-test',
            component: WebSocketTestPage,
        },
        {
            path: '/notes',
            component: NotesPage
        },
        {
            path: '/store',
            component: StorePage
        },
        {
            path: '/profile',
            component: ProfilePage
        },
        {
            path: '/products',
            component: ProductsPage,
            meta: {isAdmin: true}
        },
        {
            path: '/checkout',
            component: CheckoutPage
        }
    ],
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.isAdmin && authStore.currentUserName !== "Admin") {
        return next({name: 'login'})
    }
    next();
})

export default router
