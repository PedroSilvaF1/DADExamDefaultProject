<script setup>
    import { toast } from 'vue-sonner'
    import 'vue-sonner/style.css'
    import { Toaster } from '@/components/ui/sonner'
    import NavBar from './components/layout/NavBar.vue'
    import { useAuthStore } from './stores/auth'
    
    const authStore = useAuthStore()

    const logout = () => {
        toast.promise(authStore.logout(), {
            loading: 'Calling API',
            success: () => {
                return 'Logout Sucessfull '
            },
            error: () => `[API] Logging Out - An error occurred`,
        })
    }
</script>

<template>
    <Toaster richColors />
    <nav class="max-w-full p-5 flex flex-row justify-between align-middle">
        <div class="flex grow">
            <NavBar @logout="logout" :loggedInUser="authStore.currentUser" />
        </div>        
    </nav>
    <div>
        <main class="container m-auto">
            <div class="flex min-h-screen justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div class="w-full space-y-8">
                    <RouterView/>
                </div>
            </div>
        </main>
    </div>
</template>