<script setup lang="ts">
const {shortcutsOpen, keyboardLayoutOpen} = useGlobalState();
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
                    <AppTitlebar />
                    <slot />
                </SidebarInset>
    </SidebarProvider>
    <AppScrollToTop />
    <AppShortcutsModal v-model:open="shortcutsOpen" />
    <AppKeyboardLayoutModal v-model:open="keyboardLayoutOpen" />
</template>