<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <AppTitlebar />
            <slot />
        </SidebarInset>
    </SidebarProvider>
</template>