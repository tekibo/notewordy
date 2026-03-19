<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { wordsPerPage, setWordsPerPage } = useSettings();

const open = shallowRef(false);

const onSave = () => {
    setWordsPerPage(wordsPerPage.value);
    open.value = false;
}

</script>

<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <Button variant="outline">
                <Icon icon="lucide:settings" />
                Settings
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                    Configure the page parameters
                </DialogDescription>
            </DialogHeader>
            <div class="flex flex-col gap-2">
                <Label for="wordsPerPage">Words per page</Label>
                <Input id="wordsPerPage" v-model="wordsPerPage" />
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
</template>