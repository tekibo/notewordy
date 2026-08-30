<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { UpdateCheckResult } from '../../../desktop/src/shared/types'

const { wordsPerPage, setWordsPerPage, assameseMode, setAssameseMode, fontSize, setFontSize } = useSettings();
const { refreshNotes } = useNotes();
const { rpc } = useElectrobun();

const confirmImportOpen = shallowRef(false);
const backupOptionsOpen = shallowRef(false);
const uninstallDialogOpen = shallowRef(false);
const { keyboardLayoutOpen } = useGlobalState();
const includeSettings = ref(true);
const purgeData = ref(false);

const checkingUpdate = ref(false);
const updateStatus = ref<UpdateCheckResult | null>(null);
const applyingUpdate = ref(false);
const isUninstalling = ref(false);

const handleBackup = async () => {
    if (!rpc) return;
    const success = await rpc.request.backupNotes({
        includeSettings: includeSettings.value
    });
    if (success) {
        backupOptionsOpen.value = false;
    }
}

const handleImport = async () => {
    if (!rpc) return;
    const success = await rpc.request.importNotes({});
    if (success) {
        await refreshNotes();
        confirmImportOpen.value = false;
    }
}

const handleCheckForUpdates = async () => {
    if (!rpc) return;
    checkingUpdate.value = true;
    try {
        const res = await rpc.request.checkForUpdates({});
        updateStatus.value = res;
    } catch (e) {
        updateStatus.value = {
            currentVersion: "0.0.1",
            updateAvailable: false,
            error: "Failed to check for updates"
        };
    } finally {
        checkingUpdate.value = false;
    }
}

const handleApplyUpdate = async () => {
    if (!rpc) return;
    applyingUpdate.value = true;
    try {
        await rpc.request.applyUpdate({});
    } catch (e) {
        console.error("Failed to apply update:", e);
    } finally {
        applyingUpdate.value = false;
    }
}

const handleUninstall = async () => {
    if (!rpc) return;
    isUninstalling.value = true;
    try {
        await rpc.request.uninstallApp({ purgeData: purgeData.value });
    } catch (e) {
        console.error("Failed to uninstall:", e);
        isUninstalling.value = false;
    }
}
</script>

<template>
    <div class="w-full max-w-4xl mx-auto p-4 gap-4 flex flex-col pb-16">
        <!-- Editor Preferences -->
        <div class="flex gap-4 w-full items-start p-4 rounded-md ring ring-card gap-4 bg-card/20">
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

        <!-- Assamese Input Settings -->
        <div class="flex gap-2 flex-col p-4 rounded-md ring ring-card gap-4 bg-card/20">
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

        <!-- Data Management -->
        <div class="flex flex-col p-4 rounded-md ring ring-card gap-4 bg-card/20">
            <div class="space-y-1">
                <h4 class="text-sm font-medium leading-none">Data Management</h4>
                <p class="text-xs text-muted-foreground">
                    Export your notes to a single backup file or restore from an existing backup.
                </p>
            </div>
            <div class="flex gap-2">
                <Button variant="outline" class="flex-1" @click="backupOptionsOpen = true">
                    <Icon icon="lucide:download" class="mr-2 h-4 w-4" />
                    Backup Notes
                </Button>
                <Button variant="outline" class="flex-1" @click="confirmImportOpen = true">
                    <Icon icon="lucide:upload" class="mr-2 h-4 w-4" />
                    Import Notes
                </Button>
            </div>
        </div>

        <!-- Software Updates -->
        <div class="flex flex-col p-4 rounded-md ring ring-card gap-4 bg-card/20">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <h4 class="text-sm font-medium leading-none">Software Updates</h4>
                    <p class="text-xs text-muted-foreground">
                        NoteWordy {{ updateStatus?.currentVersion ? `v${updateStatus.currentVersion}` : '' }}
                    </p>
                </div>
                <Button variant="outline" size="sm" :disabled="checkingUpdate || applyingUpdate" @click="handleCheckForUpdates">
                    <Icon v-if="checkingUpdate" icon="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
                    <Icon v-else icon="lucide:refresh-cw" class="mr-2 h-4 w-4" />
                    Check for Updates
                </Button>
            </div>

            <div v-if="updateStatus" class="p-3 rounded-md bg-muted/40 text-xs flex flex-col gap-2">
                <div v-if="updateStatus.updateAvailable" class="flex items-center justify-between">
                    <span class="text-primary font-medium">
                        New version v{{ updateStatus.latestVersion }} is available!
                    </span>
                    <Button size="sm" :disabled="applyingUpdate" @click="handleApplyUpdate">
                        <Icon v-if="applyingUpdate" icon="lucide:loader-2" class="mr-2 h-3.5 w-3.5 animate-spin" />
                        {{ applyingUpdate ? 'Updating...' : 'Download & Restart' }}
                    </Button>
                </div>
                <div v-else-if="updateStatus.error" class="text-destructive">
                    {{ updateStatus.error }}
                </div>
                <div v-else class="text-muted-foreground">
                    NoteWordy is up to date (v{{ updateStatus.currentVersion }}).
                </div>
            </div>
        </div>

        <!-- Danger Zone / Uninstallation -->
        <div class="flex flex-col p-4 rounded-md ring ring-destructive/30 gap-4 bg-destructive/5">
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <h4 class="text-sm font-medium leading-none text-destructive">Uninstall NoteWordy</h4>
                    <p class="text-xs text-muted-foreground">
                        Cleanly remove NoteWordy from your system.
                    </p>
                </div>
                <Button variant="destructive" size="sm" @click="uninstallDialogOpen = true">
                    <Icon icon="lucide:trash-2" class="mr-2 h-4 w-4" />
                    Uninstall
                </Button>
            </div>
        </div>
    </div>

    <!-- Backup Options Dialog -->
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
                        <p class="text-xs text-muted-foreground">Include your words per page and font preferences.</p>
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

    <!-- Import Confirmation Dialog -->
    <Dialog v-model:open="confirmImportOpen">
        <DialogContent class="sm:max-w-[400px]">
            <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This will permanently overwrite all your current notes (and configurations if present in the backup) with the data from the backup file.
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

    <!-- Uninstall Confirmation Dialog -->
    <Dialog v-model:open="uninstallDialogOpen">
        <DialogContent class="sm:max-w-[420px]">
            <DialogHeader>
                <DialogTitle class="text-destructive flex items-center gap-2">
                    <Icon icon="lucide:alert-triangle" class="h-5 w-5" />
                    Uninstall NoteWordy
                </DialogTitle>
                <DialogDescription>
                    Choose how you want NoteWordy to be removed from your system.
                </DialogDescription>
            </DialogHeader>
            <div class="py-4 space-y-4">
                <div class="flex items-center justify-between space-x-2">
                    <div class="flex flex-col space-y-1">
                        <Label for="purge-data" class="font-medium">Delete notes & settings</Label>
                        <p class="text-xs text-muted-foreground">
                            {{ purgeData ? 'Your local notes and settings will be permanently wiped.' : 'Your notes and settings will be preserved for future installs.' }}
                        </p>
                    </div>
                    <Switch id="purge-data" v-model:checked="purgeData" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" :disabled="isUninstalling" @click="uninstallDialogOpen = false">
                    Cancel
                </Button>
                <Button variant="destructive" :disabled="isUninstalling" @click="handleUninstall">
                    <Icon v-if="isUninstalling" icon="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
                    {{ isUninstalling ? 'Uninstalling...' : 'Confirm Uninstall' }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
