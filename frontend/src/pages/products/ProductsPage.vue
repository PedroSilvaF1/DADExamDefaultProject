<script setup>
import {ref, onMounted} from 'vue'
import {useAPIStore} from '@/stores/api'

const apiStore = useAPIStore()
const products = ref([])
const loading = ref(false)

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await apiStore.getProducts()
    products.value = res.data
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    loading.value = false
  }
}

const editName = async (id) => {
  let name = prompt('Enter name');
  try {
    const res = await apiStore.updateNameProducts(id, name)
    await fetchProducts()
  } catch (error) {
    console.error("Error fetching products:", error)
  } finally {
    await fetchProducts()
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-6">Products List</h1>

    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin text-4xl">⏳</div>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-10 text-gray-500">
      No products found.
    </div>

    <div v-else class="rounded-md border shadow-sm overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase font-medium">
        <tr>
          <th class="px-6 py-4">Image</th>
          <th class="px-6 py-4">Name</th>
          <th class="px-6 py-4">Description</th>
          <th class="px-6 py-4 text-right">Price</th>
          <th class="px-6 py-4">Edit</th>
          <th class="px-6 py-4">Cart</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <div class="h-10 w-10 flex items-center justify-center bg-gray-100 rounded text-xl">
              📦
            </div>
          </td>
          <td class="px-6 py-4 font-medium text-gray-900">
            {{ product.name }}
          </td>
          <td class="px-6 py-4 text-gray-500 max-w-md truncate" :title="product.description">
            {{ product.description }}
          </td>
          <td class="px-6 py-4 text-right font-medium">
            {{ product.price }} €
          </td>
          <td class="px-6 py-4 text-right font-medium">
            <button @click="editName(product.id)">Editar</button>
          </td>
           <td class="px-6 py-4 text-right font-medium">
            <button
              @click="addToCart(product)"
              class="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Add +
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
