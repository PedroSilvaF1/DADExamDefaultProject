<script setup>
import { ref, inject } from 'vue'
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';

const socket = inject('socket')
const message = ref('')
const receivedMessages = ref([])

const sendMessageToServer = () => {
    if (message.value.trim() !== '') {
        socket.emit('echo', message.value)
        message.value = ''
    }
}

socket.on('echo', (msg) => {
    receivedMessages.value.push(msg)
})
</script>

<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            WebSocket Test Page
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Test WebSocket communication by sending and receiving messages
        </p>
    </div>
    <div class="mt-8 space-y-6">
        <div class="space-y-4 rounded-md shadow-sm p-8">
            <div>
                <label for="msg" class="block text-sm font-medium text-gray-700 mb-1">
                    Message to send to the server
                </label>
                <Input id="msg" v-model.trim="message" @keyup.enter="sendMessageToServer" />
            </div>
            <div>
                <Button @click="sendMessageToServer"> Send Message </Button>    
            </div>
        </div>
    </div>
    <div class="mt-8 space-y-6">
        <div class="space-y-2 rounded-md shadow-sm p-4">
            <div class="font-bold mb-4 text-xl">Received Messages:</div>
            <div v-for="(message, index) in receivedMessages" :key="index" class="text-sm">
                <span class="inline-block min-w-10">({{ index + 1 }})</span>
                {{ message }}
            </div>
        </div>
    </div>
</template>