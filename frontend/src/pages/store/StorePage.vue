<template>
  <div class="p-8 flex gap-6">

    <div class="w-2/3">
      <h1 class="text-2xl font-bold mb-4">Loja Online</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="border rounded-lg shadow-md bg-white overflow-hidden flex flex-col">
          <div class="p-4 flex-grow">
            <h3 class="font-bold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
          </div>
          <div class="p-4 bg-gray-50 border-t flex justify-between items-center">
            <span class="text-xl font-bold text-gray-900">{{ product.price }} €</span>
            <button
                @click="addToCart(product)"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/3 bg-gray-50 p-6 rounded-lg border h-fit shadow-sm">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Carrinho ({{ cart.length }})</h2>

      <div v-if="cart.length === 0" class="text-gray-500 text-center py-8">
        Carrinho vazio
      </div>

      <div v-else>
        <ul class="space-y-3">
          <li v-for="(item, index) in cart" :key="index" class="flex justify-between items-center border-b pb-2 last:border-0">
            <div class="flex-1 pr-4">
              <span class="block font-medium text-gray-800">{{ item.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-bold text-gray-900">{{ item.price }} €</span>
              <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors" aria-label="Remover">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </li>
        </ul>

        <div class="mt-6 border-t pt-4 flex justify-between items-center font-bold text-xl text-gray-900">
          <span>Total:</span>
          <span>{{ total }} €</span>
        </div>

        <button
            @click="checkout"
            class="w-full mt-6 bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          FINALIZAR COMPRA
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useAPIStore } from '@/stores/api.js';

const apiStore = useAPIStore();
const products = ref([]);
const cart = ref([]);
const socket = inject('socket'); // Para o passo 3 (WebSockets)

// 1. Carregar produtos da API
const fetchProducts = async () => {
  try {
    const res = await apiStore.getProducts();
    products.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

// 2. Lógica do Carrinho (Tudo Local)
const addToCart = (product) => {
  cart.value.push(product);
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
});

// 3. Checkout (Enviar para a API)
const checkout = async () => {
  if (cart.value.length === 0) return;

  try {
    await apiStore.createOrder({
      items: cart.value // Enviamos a lista de produtos
    });

    alert('Compra realizada com sucesso!');
    cart.value = []; // Limpar carrinho

    // WebSocket: Avisar que houve uma nova venda
    if (socket) {
      socket.emit('newOrder');
    }

  } catch (error) {
    console.error("Erro na compra", error);
    alert("Erro ao finalizar compra");
  }
};

onMounted(() => {
  fetchProducts();
});
</script>