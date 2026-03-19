<script setup lang="ts">

</script>

<template>
    <Sidebar>
        <SidebarHeader>
            <div class="flex w-full justify-between items-center">
                <NuxtLink to="/" class="font-bold text-md text-base flex items-center gap-1">
                    <img src="assets/logo.png" class="size-8">
                    NoteWordy
                </NuxtLink>
                <NoteAdd />
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Notes</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <NoteItem />
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <div class="w-full flex items-center justify-between">
                <AppSettings />
                <ModeToggle />
            </div>
        </SidebarFooter>
    </Sidebar>
</template>