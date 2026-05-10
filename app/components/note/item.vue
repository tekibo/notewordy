<script setup lang="ts">
const { notes, hasNotes } = useNotes();
const route = useRoute();
const activeNote = (id: string) => route.params.id === id;
const { assameseMode } = useAssamese();
</script>

<template>
    <SidebarMenuItem v-if="hasNotes" v-for="(note, i) in notes" :key="note.id" @click="navigateTo(`/note/${note.id}`)">
        <NoteActions :note-id="note.id">
            <SidebarMenuButton as-child :is-active="activeNote(note.id)">
                <div class="cursor-default flex justify-start items-center group/note">
                    <span class="w-4">{{ i + 1 }}</span>
                    <p class="flex-1 min-w-0 truncate" :class="{ 'font-as': assameseMode }">
                        {{ note.title || (assameseMode ? APP_CONSTANTS.DEFAULT_TITLE_AS : APP_CONSTANTS.DEFAULT_TITLE_EN) }}
                    </p>
                </div>
            </SidebarMenuButton>
        </NoteActions>
    </SidebarMenuItem>
    <SidebarMenuItem v-else>
        <p class="text-muted-foreground text-sm px-2">No notes</p>
    </SidebarMenuItem>
</template>
