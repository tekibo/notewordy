<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { rawQuery, searchNotes, addNote, backendReady, refreshNotes } = useNotes();
const { assameseMode, handleAssameseInput } = useAssamese();

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
            <div class="flex w-full justify-between items-center px-2 py-1">
                <NuxtLink to="/" class="font-bold text-xs flex items-center gap-1 no-drag">
                    <img src="assets/logo.png" class="size-6">
                    NoteWordy
                </NuxtLink>
                <SidebarTrigger class="no-drag" />
            </div>
            <div class="p-2 flex flex-col gap-2 w-full no-drag">
                <Input v-model="rawQuery" placeholder="Search" data-search-input :class="{ 'font-as': assameseMode }"
                    @input="(e: Event) => { handleAssameseInput(e, (v) => rawQuery = v); searchNotes(rawQuery); }" />
                <div class="flex gap-2 w-full">
                    <Button class="flex-1" variant="secondary" @click="navigateTo('/')">
                        <Icon icon="lucide:plus" class="w-4 h-4" />
                    </Button>
                    <Button class="flex-1" variant="outline" @click="navigateTo('/converter')">
                        <Icon icon="lucide:repeat-2" class="w-4 h-4" />
                    </Button>
                </div>
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
    </Sidebar>
</template>