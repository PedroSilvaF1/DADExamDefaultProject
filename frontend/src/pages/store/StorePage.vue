<template xmlns="http://www.w3.org/1999/html">
  <div class="mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 min-h-screen">

    <!-- Lista de Produtos -->
    <div class="w-full md:w-2/3 lg:w-3/4">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Loja Online
          </h1>
          <p class="text-muted-foreground mt-2">Explore os nossos melhores produtos.</p>
        </div>
      </div>

      <!-- Barra de Pesquisa de Produtos -->
      <div class="mb-6">
        <div class="relative max-w-md w-full">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input
            v-model="filterText"
            type="text"
            placeholder="Pesquisar produtos..."
            class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
          <button @click="filteredProducts">
            Pesquisar
          </button>
        </div>
      </div>

      <div v-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <div class="animate-spin text-4xl mb-4">⏳</div>
        <p class="text-lg font-medium">A carregar produtos...</p>
      </div>

      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
          <span class="text-4xl mb-3 opacity-50">🔍</span>
          <p class="text-lg font-medium">Nenhum produto encontrado.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

        <div v-for="product in products" :key="product.id"
             class="group relative bg-card text-card-foreground border border-border/50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">

          <!-- Imagem Placeholder Modernizada -->
          <div
              class="h-48 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
            <!-- Efeito de brilho no fundo -->
            <div
                class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span
                class="text-5xl drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">📦</span>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div class="mb-4">
              <h3 class="font-bold text-xl mb-2 leading-tight text-foreground" :title="product.name">
                {{ product.name }}
              </h3>
              <p class="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <div class="mt-auto flex items-center justify-between pt-2">
              <span class="text-2xl font-extrabold text-foreground">{{ product.price }} <span
                  class="text-sm font-normal text-muted-foreground">€</span></span>

              <button v-if="authStore.currentUserName!== 'Admin'"
                  @click="addToCart(product)"
                  class="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-200 flex items-center gap-2">
                <span>Adicionar</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrinho de Compras -->
    <div class="w-full md:w-1/3 lg:w-1/4">
      <div
          class="bg-card/50 backdrop-blur-sm text-card-foreground p-6 md:p-8 rounded-2xl border border-border md:sticky md:top-8 shadow-lg flex flex-col max-h-[calc(100vh-4rem)]">

        <div class="flex items-center justify-between mb-6 pb-4 border-b border-border">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            🛒 O seu Carrinho
          </h2>
          <span v-if="cart.length > 0"
                class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
            {{ cart.length }} Itens
          </span>
        </div>

        <div v-if="cart.length === 0"
             class="flex-grow flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
          <span class="text-4xl mb-3 opacity-50">🌩️</span>
          <p>O carrinho está vazio.</p>
        </div>

        <div v-else class="flex flex-col h-full overflow-hidden">
          <ul class="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-3 -mr-2 pb-4">
            <TransitionGroup name="list">
              <li v-for="(item, index) in cart" :key="index"
                  class="relative flex justify-between items-start bg-background p-4 rounded-xl shadow-sm border border-border/50 group hover:border-primary/30 transition-colors">

                <div class="flex flex-col pr-8">
                  <span class="font-semibold text-sm leading-tight mb-1">{{ item.name }}</span>
                  <span class="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded w-fit">{{
                      item.price
                    }} €</span>
                </div>

                <button
                    @click="removeFromCart(index)"
                    class="absolute top-2 right-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Remover do carrinho">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </li>
            </TransitionGroup>
          </ul>

          <div class="mt-auto pt-6 border-t border-border bg-card">
            <div class="flex justify-between items-end mb-6">
              <span class="text-muted-foreground font-medium text-sm text-right pb-1">Total Estimado</span>
              <span class="text-3xl font-black tracking-tight text-primary">{{ total }} €</span>
            </div>

            <button
                @click="checkout"
                class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex justify-center items-center gap-2">
              <span>FINALIZAR COMPRA</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, computed, inject} from 'vue';
import {useAPIStore} from '@/stores/api.js';
import {useAuthStore} from "@/stores/auth.js";
import {useCartStore} from "@/stores/cart.js";

const apiStore = useAPIStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const products = ref([]);
const cart = ref([]);
const filterText = ref(''); // Estado para o filtro
const socket = inject('socket');

// 1. Carregar produtos da API
const fetchProducts = async () => {
  try {
    const res = await apiStore.getProducts();
    products.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
};

// Computed para filtrar produtos
const filteredProducts = async () => {
  if (filterText.value === "")
    return fetchProducts();
  try {
    const res = await apiStore.getProducts(filterText.value);
    products.value = res.data;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

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
    await cartStore.createOrder({
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

<style scoped>
/* Estilo opcional para a scrollbar do carrinho */
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--muted);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: var(--muted-foreground);
}

/* Animações de Entrada/Saída da Lista */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>