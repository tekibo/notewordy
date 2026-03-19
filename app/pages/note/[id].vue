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
        <Input v-model="title" class="flex-1 max-w-120" placeholder="Title" />
        <div class="flex-1 flex justify-end gap-2">
            <Count :count="wordCount" title="Words" />
            <Count :count="pageCount" title="Page" />
        </div>
    </AppHeader>
    <div class="flex h-full w-full p-2">
        <Textarea v-model="content" class="
            w-full 
            resize-none 
            border-none 
            focus-visible:border-none 
            focus-visible:ring-transparent" placeholder="Write something..." />
    </div>
</template>
