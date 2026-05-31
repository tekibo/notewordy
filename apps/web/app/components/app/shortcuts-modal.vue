<script setup lang="ts">
import { SHORTCUTS } from '~/utils/shortcuts';

const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value)
})

const shortcuts = Object.entries(SHORTCUTS);
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-[380px]">
            <DialogHeader>
                <DialogTitle>Keyboard Shortcuts</DialogTitle>
                <DialogDescription>
                    Available keyboard shortcuts for NoteWordy.
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-1.5 py-2">
                <div v-for="[id, shortcut] in shortcuts" :key="id"
                    class="flex items-center justify-between text-sm py-2">
                    <span class="text-muted-foreground">{{ shortcut.description }}</span>
                    <kbd
                        class="font-mono text-xs bg-muted px-1.5 py-0.5 rounded border border-border min-w-[60px] text-center">
                        {{ shortcut.label }}
                    </kbd>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>
