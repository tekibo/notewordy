<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSidebar } from '@/components/ui/sidebar';

const { state } = useSidebar();
const {shortcutsOpen, keyboardLayoutOpen} = useGlobalState();

const route = useRoute();

const isSettings = computed(()=> route.path === '/settings');

const breadcrumb = computed(() => {
    const path = route.path;
    if (path === '/settings') return 'Settings';
    if (path === '/converter') return 'Font Converter';
    if (path.startsWith('/note/')) return 'Note';
    return null;
});
</script>

<template>
    <div class="sticky top-0 flex w-full h-[42px] py-4 bg-background justify-between items-center drag pr-36 mb-9">
        <div class="flex items-center gap-2 no-drag pl-2">
            <SidebarTrigger v-if="state === 'collapsed'" />
            <span v-if="breadcrumb" class="text-sm text-muted-foreground">
                <NuxtLink to="/" class="hover:text-foreground transition-colors">Home</NuxtLink>
                <span class="mx-1.5 text-muted-foreground/40">/</span>
                <span class="text-foreground font-medium">{{ breadcrumb }}</span>
            </span>
        </div>

        <div class="flex items-center gap-2 no-drag">
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