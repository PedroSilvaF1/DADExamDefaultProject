<script setup>
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const cartStore = useCartStore()
const router = useRouter()
const isProcessing = ref(false)
const message = ref('')

const handleCheckout = async () => {
  isProcessing.value = true
  message.value = ''
  try {
    const purchase = await cartStore.checkout()
    message.value = `Purchase successful! Total: ${purchase.total} €`
  } catch (error) {
    message.value = 'Error processing purchase.'
  } finally {
    isProcessing.value = false
  }
}

const removeItem = (index) => {
    cartStore.removeFromCart(index)
}
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>

    <div v-if="cartStore.items.length === 0 && !message" class="text-gray-500">
        Your cart is empty. <router-link to="/products" class="text-blue-600">Go to Products</router-link>
    </div>

    <div v-else-if="message" class="p-4 rounded bg-green-100 text-green-800 mb-4">
        {{ message }}
        <div class="mt-2">
            <router-link to="/products" class="underline">Continue Shopping</router-link>
        </div>
    </div>

    <div v-else>
        <div class="bg-white shadow rounded-lg overflow-hidden mb-6">
            <ul>
                <li v-for="(item, index) in cartStore.items" :key="index" class="border-b p-4 flex justify-between items-center">
                    <div>
                        <div class="font-bold">{{ item.name }}</div>
                        <div class="text-sm text-gray-500">{{ item.price }} €</div>
                    </div>
                    <button @click="removeItem(index)" class="text-red-500 hover:text-red-700">Remove</button>
                </li>
            </ul>
        </div>

        <div class="flex justify-between items-center bg-gray-50 p-6 rounded shadow">
            <div class="text-xl font-bold">Total: {{ cartStore.totalPrice.toFixed(2) }} €</div>
            <button
                @click="handleCheckout"
                :disabled="isProcessing"
                class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
                {{ isProcessing ? 'Processing...' : 'Confirm Purchase' }}
            </button>
        </div>
    </div>
  </div>
</template>
