<script setup lang="ts">
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

watchDebounced(title, (newTitle) => {
    updateNote({ id: id.value, title: newTitle });
}, { debounce: 500 })

watchDebounced(content, (newContent) => {
    updateNote({ id: id.value, content: newContent });
}, { debounce: 500 })
</script>

<template>
    <AppHeader>
        <template #left>
            <Input v-model="title" class="flex-1 bg-card/80 dark:bg-card/60 backdrop-blur-lg shadow-2xl font-as text-lg"
                placeholder="Title" />
        </template>
        <template #right>
            <Count :count="wordCount" title="Words" />
            <Count :count="pageCount" title="Page" />
        </template>
    </AppHeader>
    <div class="flex h-full mt-7 w-full p-2">
        <Textarea v-model="content" class="
            w-full 
            resize-none 
            border-none 
            leading-loose
            font-as
            text-lg
            focus-visible:border-none 
            focus-visible:ring-transparent" placeholder="Write something..." />
    </div>
</template>
