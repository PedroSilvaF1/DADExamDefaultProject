<template>
  <div class="p-8 flex gap-6">

    <div class="w-2/3">
      <h1 class="text-2xl font-bold mb-4">Loja Online</h1>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="product in products" :key="product.id" class="border p-4 rounded shadow bg-white">
          <h3 class="font-bold text-lg">{{ product.name }}</h3>
          <p class="text-gray-600">{{ product.description }}</p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-xl font-bold">{{ product.price }} €</span>
            <button
                @click="addToCart(product)"
                class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-1/3 bg-gray-50 p-4 rounded border h-fit">
      <h2 class="text-xl font-bold mb-4">Carrinho ({{ cart.length }})</h2>

      <div v-if="cart.length === 0" class="text-gray-500">
        Carrinho vazio.
      </div>

      <div v-else>
        <ul>
          <li v-for="(item, index) in cart" :key="index" class="flex justify-between mb-2 border-b pb-2">
            <span>{{ item.name }}</span>
            <span class="font-bold">{{ item.price }} €</span>
            <button @click="removeFromCart(index)" class="text-red-500 text-sm">X</button>
          </li>
        </ul>

        <div class="mt-4 border-t pt-4 flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>{{ total }} €</span>
        </div>

        <button
            @click="checkout"
            class="w-full mt-4 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">
          FINALIZAR COMPRA
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import axios from 'axios'; // Ou usa o teu store

const products = ref([]);
const cart = ref([]);
const socket = inject('socket'); // Para o passo 3 (WebSockets)

// 1. Carregar produtos da API
const fetchProducts = async () => {
  // Ajusta o URL conforme a tua config (ex: /api/products)
  const res = await axios.get('http://localhost:8000/api/products');
  products.value = res.data;
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
    await axios.post('http://localhost:8000/api/orders', {
      items: cart.value // Enviamos a lista de produtos
    });

    alert('Compra realizada com sucesso!');
    cart.value = []; // Limpar carrinho

    // WebSocket: Avisar que houve uma nova venda
    socket.emit('newOrder');

  } catch (error) {
    console.error("Erro na compra", error);
    alert("Erro ao finalizar compra");
  }
};

onMounted(() => {
  fetchProducts();
});
</script>