<script setup lang="ts">
import { APP_CONSTANTS } from '~/utils/constants';
const route = useRoute();
const id = computed(() => route.params.id as string);

const { getNote, updateNote } = useNotes();

const { activeNoteId, activeNoteTitle: title, activeNoteContent: content } = useActiveNoteState();

watch(id, (newId) => {
    activeNoteId.value = newId;
    const note = getNote(newId);
    if (note) {
        title.value = note.title;
        content.value = note.content;
    } else {
        title.value = "";
        content.value = "";
    }
}, { immediate: true })

const { fontSize, assameseMode } = useSettings();
const { handleAssameseInput } = useAssamese();

watchDebounced(title, (newTitle) => {
    if (!getNote(id.value)) return;
    updateNote({ id: id.value, title: newTitle });
}, { debounce: 500 })

watchDebounced(content, (newContent) => {
    if (!getNote(id.value)) return;
    updateNote({ id: id.value, content: newContent });
}, { debounce: 500 })
watch(assameseMode, (enabled) => {
    if (enabled && title.value === APP_CONSTANTS.DEFAULT_TITLE_EN) {
        title.value = APP_CONSTANTS.DEFAULT_TITLE_AS;
    } else if (!enabled && title.value === APP_CONSTANTS.DEFAULT_TITLE_AS) {
        title.value = APP_CONSTANTS.DEFAULT_TITLE_EN;
    }
})
</script>

<template>
    <div class="flex flex-1 min-h-0 w-full p-2">
        <div class="fixed top-10 w-full flex h-8 z-999 bg-linear-to-b from-background to-background/20 pointer-events-none"/>
        <Textarea v-model="content" class="
            p-4
            pb-48
            w-full
            h-full
            max-h-full
            min-h-0
            resize-none 
            border-none 
            leading-normal!
            dark:bg-background
            bg-background
            focus-visible:border-none
            focus-visible:ring-transparent
            overflow-y-auto" :class="{ 'font-as': assameseMode }" :style="{ fontSize: `${fontSize}px` }"
            :placeholder="assameseMode ? APP_CONSTANTS.PLACEHOLDER_CONTENT_AS : APP_CONSTANTS.PLACEHOLDER_CONTENT_EN"
            @input="(e: Event) => handleAssameseInput(e, (v) => content = v)" />
        </div>
        <div class="fixed bottom-0 w-full flex h-12 z-999 bg-linear-to-t from-background to-background/20 pointer-events-none"/>
</template>
