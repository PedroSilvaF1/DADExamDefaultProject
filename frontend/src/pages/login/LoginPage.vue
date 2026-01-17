<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const router = useRouter()

const formData = ref({
    email: 'test@example.com',
    password: 'password'
})

const handleSubmit = async () => {
    try {
        await authStore.login(formData.value)
        toast.success(`Login Sucessfull - ${authStore.currentUserName}`)
        router.push('/')
    } catch (error) {
        toast.error(`[API] Login error: ${error?.response?.data?.message || error.message}`)
    }
}
</script>

<template>
    <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access your account
        </p>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4 rounded-md shadow-sm p-8">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <Input id="email" v-model="formData.email" type="email" autocomplete="email" required
                    placeholder="you@example.com" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <Input id="password" v-model="formData.password" type="password" autocomplete="current-password"
                    required placeholder="••••••••" />
            </div>
        </div>


        <div>
            <Button type="submit" class="w-full"> Sign in </Button>
        </div>

        <div class="text-center text-sm">
            <span class="text-gray-600">Don't have an account? </span>
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Sign up
            </a>
        </div>
    </form>
</template>
