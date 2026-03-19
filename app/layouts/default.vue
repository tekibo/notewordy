<script setup lang="ts">


</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <slot />
        </SidebarInset>
    </SidebarProvider>
</template>