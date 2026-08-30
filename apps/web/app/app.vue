<script setup lang="ts">
import { matchShortcut, type ShortcutId } from '~/utils/shortcuts';

const { handleNewNote } = useNotes();
const { setAssameseMode, assameseMode } = useSettings();
const { shortcutsOpen, keyboardLayoutOpen } = useGlobalState();
const { rpc } = useElectrobun();

onMounted(() => {
  if (rpc) {
    rpc.request.nuxtReady({});
  }
});

const handlers: Partial<Record<ShortcutId, () => void>> = {
  'new-note': handleNewNote,
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

const onKeydown = (e: KeyboardEvent) => {
  const id = matchShortcut(e);
  if (id && handlers[id]) {
    e.preventDefault();
    handlers[id]!();
  }
};

onMounted(() => window.addEventListener('keydown', onKeydown));
onUnmounted(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
