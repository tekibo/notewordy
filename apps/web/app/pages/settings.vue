<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { wordsPerPage, setWordsPerPage, assameseMode, setAssameseMode, fontSize, setFontSize } = useSettings();
const { refreshNotes } = useNotes();

const confirmImportOpen = shallowRef(false);
const backupOptionsOpen = shallowRef(false);
const {keyboardLayoutOpen} = useGlobalState();
const includeSettings = ref(true);

const handleBackup = async () => {
    const success = await window.electron.notes.backup({
        includeSettings: includeSettings.value
    });
    if (success) {
        backupOptionsOpen.value = false;
    }
}

const handleImport = async () => {
    const success = await window.electron.notes.import();
    if (success) {
        await refreshNotes();
        confirmImportOpen.value = false;
    }
}
</script>

<template>
        <div class="w-full p-4 gap-4 flex flex-col">
            <div class="flex gap-4 w-full items-start  p-4 rounded-md ring ring-card gap-4">
                <!-- Words per page -->
                <div class="flex flex-col gap-2">
                    <Label for="wordsPerPage">Words per page</Label>
                    <Input id="wordsPerPage" :model-value="wordsPerPage" type="number"
                        @update:model-value="(v) => setWordsPerPage(Number(v))" />
                </div>
                <!-- Font Slider -->
                <div class="flex flex-col flex-1 gap-4">
                    <div class="flex justify-between items-center">
                        <Label for="fontSize">Font Size</Label>
                        <span class="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{{ fontSize }}px</span>
                    </div>
                    <Slider 
                        id="fontSize" 
                        :model-value="[fontSize]" 
                        :max="APP_CONSTANTS.MAX_FONT_SIZE"
                        :min="APP_CONSTANTS.MIN_FONT_SIZE" :step="1"
                        @update:model-value="(v) => { 
                            if (v && v.length > 0 && typeof v[0] === 'number'){
                                setFontSize(v[0])
                            } 
                        }" 
                    />
                </div>
            </div>

            <div class="flex gap-2 flex-col p-4 rounded-md ring ring-card gap-4">
                <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                        <Label for="assameseMode">Assamese Mode</Label>
                        <p class="text-xs text-muted-foreground">Transliterate Latin to Assamese characters as you type</p>
                    </div>
                    <Switch id="assameseMode" :model-value="assameseMode" @update:model-value="setAssameseMode" />
                </div>
    
                <Button variant="outline" size="sm" @click="keyboardLayoutOpen = true">
                    View Keyboard Layout
                </Button>
            </div>

            <div class="flex flex-col p-4 rounded-md ring ring-card gap-4">
                <div class="space-y-1">
                    <h4 class="text-sm font-medium leading-none">Data Management</h4>
                    <p class="text-sm text-muted-foreground">
                        Export your notes to a file or restore from a backup.
                    </p>
                </div>
                <div class="flex gap-2">
                    <Button variant="outline" class="flex-1" @click="backupOptionsOpen = true">
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

        <Dialog v-model:open="backupOptionsOpen">
            <DialogContent class="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Backup Options</DialogTitle>
                    <DialogDescription>
                        Customize what you want to include in your backup file.
                    </DialogDescription>
                </DialogHeader>
                <div class="py-4 space-y-4">
                    <div class="flex items-center justify-between space-x-2">
                        <div class="flex flex-col space-y-1">
                            <Label for="include-settings">Include configurations</Label>
                            <p class="text-xs text-muted-foreground">Include your words per page and theme preferences.
                            </p>
                        </div>
                        <Switch id="include-settings" v-model:checked="includeSettings" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" @click="backupOptionsOpen = false">
                        Cancel
                    </Button>
                    <Button @click="handleBackup">
                        Create Backup
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog v-model:open="confirmImportOpen">
            <DialogContent class="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This will permanentely overwrite all your current notes (and configurations if present in the
                        backup) with the data from the backup file. This
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
</template>
