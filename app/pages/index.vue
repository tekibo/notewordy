<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { addNote } = useNotes();
const keyboardLayoutOpen = shallowRef(false);

const timeOfDay = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
})
</script>

<template>
    <div class="relative flex flex-1 flex-col items-center justify-center p-4 md:p-8 h-full overflow-hidden">
        <!-- Ambient Background -->
        <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] animate-pulse"></div>
            <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
        </div>

        <div class="max-w-2xl w-full flex flex-col items-center gap-8 md:gap-12 text-center relative py-4">
            <!-- Header Section -->
            <header class="space-y-3 md:space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 shrink-0">
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    Good {{ timeOfDay }}, <br />
                    <span class="text-muted-foreground/40">Capture your thoughts.</span>
                </h1>
                <p class="text-xs md:text-sm text-muted-foreground/60 max-w-sm mx-auto leading-relaxed">
                    A minimal space for your ideas, notes, and everything in between.
                </p>
            </header>

            <!-- Quick Actions Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                <button @click="addNote" 
                    class="group flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 text-left">
                    <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Icon icon="lucide:plus" class="w-5 h-5" />
                    </div>
                    <div class="min-w-0">
                        <h3 class="font-bold text-sm mb-0.5">New Note</h3>
                        <p class="text-[10px] text-muted-foreground/50 leading-tight">Start a fresh document.</p>
                    </div>
                </button>

                <button @click="keyboardLayoutOpen = true" 
                    class="group flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 text-left">
                    <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Icon icon="lucide:keyboard" class="w-5 h-5" />
                    </div>
                    <div class="min-w-0">
                        <h3 class="font-bold text-sm mb-0.5">Keyboard</h3>
                        <p class="text-[10px] text-muted-foreground/50 leading-tight">Assamese typing guide.</p>
                    </div>
                </button>
            </div>

        </div>

        <!-- Keyboard Layout Modal -->
        <AppKeyboardLayoutModal v-model:open="keyboardLayoutOpen" />
    </div>
</template>

<style scoped>
@keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
}

.animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>