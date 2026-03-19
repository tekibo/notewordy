<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { addNote } = useNotes();

</script>

<template>
    <Button variant="secondary" @click="addNote">
        <Icon icon="lucide:plus" />
    </Button>
</template>