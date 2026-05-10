<script setup lang="ts">
import { APP_CONSTANTS } from '~/utils/constants';
const route = useRoute();
const id = computed(() => route.params.id as string);

const { getNote, updateNote } = useNotes();

const title = shallowRef<string>("");
const content = shallowRef<string>("");

watch(id, (newId) => {
    const note = getNote(newId);
    if (note) {
        title.value = note.title;
        content.value = note.content;
    }
}, { immediate: true })


const { wordCount, pageCount } = useCount(content);

const { fontSize, assameseMode } = useSettings();
const { handleAssameseInput } = useAssamese();

watchDebounced(title, (newTitle) => {
    updateNote({ id: id.value, title: newTitle });
}, { debounce: 500 })

watchDebounced(content, (newContent) => {
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
    <AppHeader>
        <template #left>
            <Input v-model="title" class="flex-1 bg-card/80 dark:bg-card/60 backdrop-blur-lg shadow-2xl text-lg"
                :class="{ 'font-as': assameseMode }" :style="{ fontSize: `${Math.min(fontSize, APP_CONSTANTS.MAX_TITLE_FONT_SIZE)}px` }"
                :placeholder="assameseMode ? APP_CONSTANTS.PLACEHOLDER_TITLE_AS : APP_CONSTANTS.PLACEHOLDER_TITLE_EN"
                @input="(e: Event) => handleAssameseInput(e, (v) => title = v)" />
        </template>
        <template #right>
            <Count :count="wordCount" title="Words" />
            <Count :count="pageCount" title="Page" />
        </template>
    </AppHeader>
    <div class="flex h-full mt-7 w-full p-2">
        <Textarea v-model="content" class="
            p-4
            w-full 
            resize-none 
            border-none 
            leading-normal!
            dark:bg-background
            bg-background
            focus-visible:border-none
            focus-visible:ring-transparent" :class="{ 'font-as': assameseMode }" :style="{ fontSize: `${fontSize}px` }"
            :placeholder="assameseMode ? APP_CONSTANTS.PLACEHOLDER_CONTENT_AS : APP_CONSTANTS.PLACEHOLDER_CONTENT_EN"
            @input="(e: Event) => handleAssameseInput(e, (v) => content = v)" />
    </div>
</template>
