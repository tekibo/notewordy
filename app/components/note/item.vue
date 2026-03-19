<script setup lang="ts">
const { notes, hasNotes } = useNotes();
</script>

<template>
    <SidebarMenuItem v-if="hasNotes" v-for="(note, i) in notes" :key="i">
        <NoteActions :note-id="note.id">
            <SidebarMenuButton as-child>
                <div class="flex justify-between items-center group/note">
                    <NuxtLink :to="`/note/${note.id}`">
                        {{ note.title }}
                    </NuxtLink>

                </div>
            </SidebarMenuButton>
        </NoteActions>
    </SidebarMenuItem>
    <SidebarMenuItem v-else>
        <p class="text-muted-foreground text-sm px-2">No notes</p>
    </SidebarMenuItem>
</template>
