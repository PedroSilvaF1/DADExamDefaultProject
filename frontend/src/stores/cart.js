import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAPIStore } from '@/stores/api'

export const useCartStore = defineStore('cart', () => {
    const items = ref([]) // list of product IDs or objects
    const apiStore = useAPIStore()

    // Add product to cart.
    // Task: "clicar no produto adiciona esse produto ao carrinho com a quantidade 1"
    // I store the product object for display, and use ID for checkout.
    const addToCart = (product) => {
        items.value.push(product)
    }

    const removeFromCart = (index) => {
        items.value.splice(index, 1)
    }

    const count = computed(() => items.value.length)

    const totalPrice = computed(() => {
        return items.value.reduce((sum, item) => sum + parseFloat(item.price), 0)
    })

    const checkout = async () => {
        const ids = items.value.map(p => p.id)
        if (ids.length === 0) return

        try {
            const response = await apiStore.createPurchase({ cart: ids })
            items.value = [] // Clear cart on success
            return response.data
        } catch (error) {
            console.error("Checkout failed", error)
            throw error
        }
    }

    const createOrder = async (order) => {
        // Support for StorePage.vue which passes { items: [...] }
        const ids = order.items.map(p => p.id)
        if (ids.length === 0) return

        return apiStore.createPurchase({ cart: ids })
    }

    return { items, addToCart, removeFromCart, count, totalPrice, checkout, createOrder }
})
