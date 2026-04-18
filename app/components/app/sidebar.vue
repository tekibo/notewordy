<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { rawQuery, searchNotes, addNote, backendReady, refreshNotes } = useNotes();

watch(backendReady, (ready) => {
    if (ready) {
        console.log("Backend is ready, refreshing notes...");
        refreshNotes();
    }
})

</script>

<template>
    <Sidebar variant="floating">
        <SidebarHeader class="drag">
            <div class="flex w-full justify-between items-center">
                <NuxtLink to="/" class="font-bold text-xs flex items-center gap-1">
                    <img src="assets/logo.png" class="size-6">
                    NoteWordy
                </NuxtLink>
            </div>
            <div class="p-2 flex flex-col gap-2 w-full">
                <Input v-model="rawQuery" placeholder="Search" @input="searchNotes(rawQuery)" />
                <Button class="w-full" @click="addNote">
                    <span class="text-sm">New Note</span>
                    <Icon icon="lucide:plus" />
                </Button>
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
            <div class="w-full flex items-center justify-end">
                <AppSettings />
            </div>
        </SidebarFooter>
    </Sidebar>
</template>