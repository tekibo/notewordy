<script setup lang="ts">
import { Icon } from '@iconify/vue';

const minimize = () => window.electron.window.minimize();
const maximize = () => window.electron.window.maximize();
const close = () => window.electron.window.close();
</script>

<template>
    <div class="sticky top-0 flex w-full p-2 justify-end z-200 drag">
        <div class="
                    no-drag 
                    rounded-full 
                    p-1
                    ring ring-sidebar-ring/40
                    bg-card/80
                    backdrop-blur-xl 
                    flex gap-1 items-center justify-center
                    ">
            <button @click="minimize"
                class="hover:bg-muted rounded-full p-1.5 transition-colors flex items-center justify-center"
                aria-label="Minimize">
                <Icon icon="fluent:minimize-16-filled" class="text-muted-foreground w-3.5 h-3.5" />
            </button>
            <button @click="maximize"
                class="hover:bg-muted rounded-full p-1.5 transition-colors flex items-center justify-center"
                aria-label="Maximize">
                <Icon icon="fluent:maximize-16-regular" class="text-muted-foreground w-3.5 h-3.5" />
            </button>
            <button @click="close"
                class="hover:bg-destructive/80 hover:text-destructive-foreground rounded-full p-1.5 transition-colors flex items-center justify-center group"
                aria-label="Close">
                <Icon icon="material-symbols-light:close" class="w-4 h-4 group-hover:text-white" />
            </button>
        </div>
    </div>
</template>