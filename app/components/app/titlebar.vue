<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar';

const { state } = useSidebar();
const keyboardLayoutOpen = shallowRef(false);
</script>

<template>
    <div class="sticky top-0 flex w-full h-[42px] py-4 bg-linear-to-b from-background to-background/20 justify-between items-center drag pr-36 mb-9">
        <div class="no-drag">
            <SidebarTrigger v-if="state === 'collapsed'" />
        </div>

        <div class="no-drag">
            <AppSettings />
        </div>
        <!-- Keyboard Layout Modal -->
        <AppKeyboardLayoutModal v-model:open="keyboardLayoutOpen" />
    </div>
</template>