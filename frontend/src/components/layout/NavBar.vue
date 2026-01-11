<script setup>
    import { inject } from 'vue'   
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu'
    import { Button } from '@/components/ui/button' 

    const studentName = inject('studentName')
    const studentNumber = inject('studentNumber')   
    
    const emits = defineEmits(['logout'])
    const { loggedInUser } = defineProps(['loggedInUser'])
    
    const logoutClickHandler = () => {
        emits('logout')
    }
</script>

<template>
    <header class="flex w-full items-center justify-between border-b px-4 py-2">        
        <div class="flex items-center gap-4">
            <RouterLink to="/" class="mr-4">
                <div class="font-bold text-lg">DAD Practical Exam</div>
                <div>
                    <span class="font-light text-xs">{{ studentNumber }} - </span>
                    <span class="font-light text-xs">{{ studentName }}</span>
                </div>
            </RouterLink>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost">Tests</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                        <RouterLink to="/websocket-test" class="w-full">WebSocket Tests</RouterLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost">Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                        <RouterLink to="/" class="w-full">Menu 1</RouterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RouterLink to="/" class="w-full">Menu 2</RouterLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <div class="flex items-center gap-4">
            <div v-if="!loggedInUser">
                <Button  variant="ghost" as-child>
                    <RouterLink to="/login">Login</RouterLink>
                </Button>
            </div>            
            <div v-else>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost">{{ loggedInUser.name }}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <RouterLink to="/" class="w-full">Profile</RouterLink>
                        </DropdownMenuItem>
                        <hr>
                        <DropdownMenuItem>
                            <a @click.prevent="logoutClickHandler">Logout</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>                
            </div>            
        </div>        
    </header>
</template>