<script setup>
import { ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const authStore = useAuthStore()
const router = useRouter()

const passwordForm = ref({
    current_password: '',
    password: '',
    password_confirmation: ''
})

const handlePasswordChange = async () => {
    try {
        await authStore.changePassword(passwordForm.value)
        toast.success(`Password changed successfully for user ${authStore.currentUserName}`)
        // Clear form
        passwordForm.value = {
            current_password: '',
            password: '',
            password_confirmation: ''
        }
    } catch (error) {
        toast.error(`Error changing password: ${error?.response?.data?.message || error.message}`)
    }
}
</script>

<template>
    <div class="max-w-md mx-auto py-6">
        <div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                User Profile
            </h2>
            <div class="mt-4 text-center">
                <p class="text-lg font-medium text-gray-900">Name: {{ authStore.currentUserName || 'N/A' }}</p>
                <p class="text-sm text-gray-500">User ID: {{ authStore.currentUserID || 'N/A' }}</p>
            </div>
        </div>

        <div class="mt-8 border-t pt-6">
            <h3 class="text-xl font-semibold mb-4">Change Password</h3>
            <form class="space-y-6" @submit.prevent="handlePasswordChange">
                <div class="space-y-4 rounded-md shadow-sm">
                    <div>
                        <label for="current_password" class="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                        </label>
                        <Input id="current_password" v-model="passwordForm.current_password" type="password" required />
                    </div>

                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <Input id="password" v-model="passwordForm.password" type="password" required />
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <Input id="password_confirmation" v-model="passwordForm.password_confirmation" type="password" required />
                    </div>
                </div>

                <Button type="submit" class="w-full">
                    Update Password
                </Button>
            </form>
        </div>
    </div>
</template>
