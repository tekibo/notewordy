<script setup lang="ts">
import { matchShortcut, type ShortcutId } from '~/utils/shortcuts';

onMounted(() => {
  window.electron.nuxtReady();
})

const { addNote } = useNotes();
const { setAssameseMode, assameseMode } = useSettings();

const handlers: Partial<Record<ShortcutId, () => void>> = {
  'new-note': addNote,
  'toggle-assamese': () => setAssameseMode(!assameseMode.value),
  'open-settings': () => navigateTo('/settings'),
  'open-converter': () => navigateTo('/converter'),
  'go-home': () => navigateTo('/'),
  'focus-search': () => {
    const search = document.querySelector<HTMLInputElement>('[data-search-input]');
    search?.focus();
  },
  'open-shortcuts': () => shortcutsOpen.value = true,
  'open-keyboard-layout': () => keyboardLayoutOpen.value = true,
};

const {shortcutsOpen, keyboardLayoutOpen} = useGlobalState();

const onKeydown = (e: KeyboardEvent) => {
  const id = matchShortcut(e);
  if (id && handlers[id]) {
    e.preventDefault();
    handlers[id]!();
  }
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));

const colorMode = useColorMode();
watch(() => colorMode.value, (resolved) => {
  if (window.electron?.setTitlebarOverlay) {
    const isDark = resolved === 'dark';
    window.electron.setTitlebarOverlay({ symbolColor: isDark ? '#fafafa' : '#09090b' });
  }
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
