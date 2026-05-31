<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSidebar } from '@/components/ui/sidebar';
import { APP_CONSTANTS } from '~/utils/constants';

const { state } = useSidebar();
const {shortcutsOpen} = useGlobalState();

const route = useRoute();

const isSettings = computed(()=> route.path === '/settings');
const isConverter = computed(()=> route.path === '/converter');
const isNote = computed(() => route.path.startsWith('/note/'));

const { activeNoteTitle: title, activeNoteContent: content } = useActiveNoteState();
const { wordCount, pageCount } = useCount(content);
const { fontSize, assameseMode } = useSettings();
const { handleAssameseInput } = useAssamese();
</script>

<template>
    <div class="sticky top-0 flex w-full h-[42px] py-4 bg-background justify-between items-center drag pr-36 mb-9">
        <div class="flex items-center gap-2 no-drag pl-2 min-w-0 flex-1">
            <SidebarTrigger v-if="state === 'collapsed'" />
            <Input v-if="isNote" v-model="title"
                class="h-8 min-w-0 max-w-xl flex-1 bg-card/80 dark:bg-card/60 text-sm shadow-sm"
                :class="{ 'font-as': assameseMode }"
                :style="{ fontSize: `${Math.min(fontSize, APP_CONSTANTS.MAX_TITLE_FONT_SIZE)}px` }"
                :placeholder="assameseMode ? APP_CONSTANTS.PLACEHOLDER_TITLE_AS : APP_CONSTANTS.PLACEHOLDER_TITLE_EN"
                @input="(e: Event) => handleAssameseInput(e, (v) => title = v)" />
            <span v-else-if="isConverter || isSettings" class="text-sm text-muted-foreground">
                <NuxtLink to="/" class="hover:text-foreground transition-colors">Home</NuxtLink>
                <span class="mx-1.5 text-muted-foreground/40">/</span>
                <span v-if="isConverter" class="text-foreground font-medium">Font Converter</span>
                <span v-if="isSettings" class="text-foreground font-medium">Settings</span>
            </span>
        </div>

        <div class="flex items-center gap-2 no-drag">
            <template v-if="isNote">
                <Count :count="wordCount" title="Words" />
                <Count :count="pageCount" title="Page" />
            </template>
            <div v-if="isSettings" class="flex gap-2 items-center">
                <ModeToggle />
                <Button variant="outline" size="sm" @click="shortcutsOpen = true">
                    <Icon icon="lucide:keyboard" class="w-4 h-4 mr-2" />
                    Shortcuts
                </Button>
            </div>
            <Button v-else variant="outline" size="sm" @click="navigateTo('/settings')">
                <Icon icon="lucide:settings" class="w-4 h-4 text-muted-foreground" />
            </Button>
        </div>

    </div>
</template>
