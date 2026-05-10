<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar';
import { Icon } from '@iconify/vue';

const { state } = useSidebar();
const { assameseMode } = useSettings();
const keyboardLayoutOpen = shallowRef(false);

const minimize = () => window.electron.window.minimize();
const maximize = () => window.electron.window.maximize();
const close = () => window.electron.window.close();
</script>

<template>
    <div class="sticky top-0 flex w-full p-2 justify-between items-center z-200 drag">
        <div class="flex items-center gap-2 no-drag">
            <SidebarTrigger v-if="state === 'collapsed'" />
            
            <!-- Assamese Mode Bubble (Clickable) -->
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <button v-if="assameseMode" @click="keyboardLayoutOpen = true"
                    class="group flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm">
                    <span class="w-1 h-1 rounded-full bg-current"></span>
                    Assamese Mode
                </button>
            </Transition>
        </div>

        <div class="flex items-center gap-2 no-drag">
            <!-- Settings Button (Rounded Full) -->
            <AppSettings />

            <!-- Window Controls -->
            <div class="
                        rounded-full 
                        p-1
                        ring ring-sidebar-ring/20
                        bg-card/50
                        backdrop-blur-xl 
                        flex gap-0.5 items-center justify-center
                        border border-border/40
                        ">
                <button @click="minimize"
                    class="hover:bg-muted rounded-full p-1.5 transition-colors flex items-center justify-center"
                    aria-label="Minimize">
                    <Icon icon="fluent:minimize-16-filled" class="text-muted-foreground w-3 h-3" />
                </button>
                <button @click="maximize"
                    class="hover:bg-muted rounded-full p-1.5 transition-colors flex items-center justify-center"
                    aria-label="Maximize">
                    <Icon icon="fluent:maximize-16-regular" class="text-muted-foreground w-3 h-3" />
                </button>
                <button @click="close"
                    class="hover:bg-destructive/80 hover:text-destructive-foreground rounded-full p-1.5 transition-colors flex items-center justify-center group"
                    aria-label="Close">
                    <Icon icon="material-symbols-light:close" class="w-3.5 h-3.5 group-hover:text-white" />
                </button>
            </div>
        </div>

        <!-- Keyboard Layout Modal -->
        <AppKeyboardLayoutModal v-model:open="keyboardLayoutOpen" />
    </div>
</template>