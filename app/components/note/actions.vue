<script setup lang="ts">
const { deleteNote } = useNotes()

const props = defineProps<{
    noteId: string
}>()

const handleDelete = () => {
    deleteNote(props.noteId)
}
</script>

<template>
    <Dialog>
        <ContextMenu>
            <ContextMenuTrigger>
                <slot />
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>Export</ContextMenuItem>
                <DialogTrigger as-child>
                    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                </DialogTrigger>
            </ContextMenuContent>
        </ContextMenu>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose as-child>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" @click="handleDelete">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
