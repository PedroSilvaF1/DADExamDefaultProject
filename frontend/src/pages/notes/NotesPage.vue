<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">As Minhas Notas</h1>

    <div class="bg-gray-100 p-4 rounded mb-8">
      <input v-model="newNote.title" placeholder="Título" class="border p-2 mr-2 rounded" />
      <input v-model="newNote.content" placeholder="Conteúdo" class="border p-2 mr-2 rounded" />
      <button @click="addNote" class="bg-blue-600 text-white px-4 py-2 rounded">Adicionar Nota</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="note in notes" :key="note.id" class="border p-4 rounded shadow">
        <h3 class="font-bold">{{ note.title }}</h3>
        <p>{{ note.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useAPIStore } from '@/stores/api.js'; // Corrigido: useAPIStore em vez de useApi

const apiStore = useAPIStore(); // Usar o store
const notes = ref([]);
const newNote = ref({ title: '', content: '' });
const socket = inject('socket');

// 1. Carregar notas ao iniciar a página
const fetchNotes = async () => {
  try {
    const response = await apiStore.getNotes(); // Usar método do store
    notes.value = response.data;
  } catch (error) {
    console.error("Erro a carregar notas", error);
  }
};

// 2. Adicionar nota
const addNote = async () => {
  try {
    const response = await apiStore.createNote(newNote.value); // Usar método do store

    // Adiciona à lista localmente (para ser rápido)
    notes.value.push(response.data);

    // LIMPAR O FORMULÁRIO
    newNote.value = { title: '', content: '' };

    // --- A MAGIA DO WEBSOCKET AQUI ---
    // Avisar o servidor socket que criámos uma nota nova
    socket.emit('newNoteCreated', response.data);

  } catch (error) {
    console.error("Erro ao criar", error);
  }
};

// 3. Ouvir se ALGUÉM criou uma nota (Real-time)
onMounted(() => {
  fetchNotes();

  // Se o servidor mandar mensagem "newNoteCreated", nós adicionamos à lista
  socket.on('newNoteCreated', (noteRecebida) => {
    console.log("Recebi uma nota via socket!", noteRecebida);
    // Só adicionamos se ela já não estiver lá (para evitar duplicados)
    if (!notes.value.find(n => n.id === noteRecebida.id)) {
      notes.value.push(noteRecebida);
    }
  });
});
</script>