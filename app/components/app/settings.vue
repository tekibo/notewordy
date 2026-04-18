<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { wordsPerPage, setWordsPerPage } = useSettings();
const { refreshNotes } = useNotes();

const open = shallowRef(false);
const confirmImportOpen = shallowRef(false);

const onSave = () => {
    setWordsPerPage(wordsPerPage.value);
    open.value = false;
}

const handleBackup = async () => {
    await window.electron.notes.backup();
}

const handleImport = async () => {
    const success = await window.electron.notes.import();
    if (success) {
        await refreshNotes();
        confirmImportOpen.value = false;
        open.value = false;
    }
}

</script>

<template>
    <div>
        <Dialog v-model:open="open">
            <DialogTrigger as-child>
                <Button variant="outline">
                    <Icon icon="lucide:settings" />
                    Settings
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure the page parameters and manage your data.
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-6 py-4">
                    <div class="flex flex-col gap-2">
                        <Label for="wordsPerPage">Words per page</Label>
                        <Input id="wordsPerPage" v-model="wordsPerPage" type="number" />
                    </div>

                    <Separator />

                    <div class="flex flex-col gap-4">
                        <div class="space-y-1">
                            <h4 class="text-sm font-medium leading-none">Data Management</h4>
                            <p class="text-sm text-muted-foreground">
                                Export your notes to a file or restore from a backup.
                            </p>
                        </div>
                        <div class="flex gap-2">
                            <Button variant="outline" class="flex-1" @click="handleBackup">
                                <Icon icon="lucide:download" class="mr-2 h-4 w-4" />
                                Backup
                            </Button>
                            <Button variant="outline" class="flex-1" @click="confirmImportOpen = true">
                                <Icon icon="lucide:upload" class="mr-2 h-4 w-4" />
                                Import
                            </Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button @click="onSave">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Import Confirmation Dialog -->
        <Dialog v-model:open="confirmImportOpen">
            <DialogContent class="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This will permanentely overwrite all your current notes with the data from the backup file. This
                        action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" @click="confirmImportOpen = false">
                        Cancel
                    </Button>
                    <Button variant="destructive" @click="handleImport">
                        Yes, Import and Overwrite
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>