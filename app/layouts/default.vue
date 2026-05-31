<script setup lang="ts">

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
</template>