<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { handleNewNote } = useNotes();
const keyboardLayoutOpen = shallowRef(false);
const openKeyboardLayout = () => {
    keyboardLayoutOpen.value = true
}

const openConverter = () => navigateTo('/converter')

const timeOfDay = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
})
</script>

<template>
    <div class="flex flex-1 flex-col items-center justify-center overflow-hidden">
        <div class="max-w-2xl w-full flex flex-col items-center gap-8 md:gap-12 text-center relative py-4">
            <!-- Header Section -->
            <header class="space-y-3 md:space-y-4 animate-in fade-in duration-1000 shrink-0">
                <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    Good {{ timeOfDay }}
                </h1>
            </header>

            <!-- Quick Actions Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
                <FunctionButton :on-click="handleNewNote" name="New Note" description="Start a fresh document.">
                    <template #icon>
                        <Icon icon="lucide:plus" class="w-5 h-5" />
                    </template>
                </FunctionButton>

                 <FunctionButton :on-click="openKeyboardLayout" name="Keyboard" description="Assamese typing guide.">
                    <template #icon>
                        <Icon icon="lucide:keyboard" class="w-5 h-5" />
                    </template>
                </FunctionButton>

                <FunctionButton :on-click="openConverter" name="Converter" description="Geetanjali ↔ Unicode.">
                    <template #icon>
                        <Icon icon="lucide:repeat-2" class="w-5 h-5" />
                    </template>
                </FunctionButton>
            </div>

        </div>
    </div>
</template>