<script setup lang="ts">

onMounted(() => {
  // @ts-ignore
  window.electron.ready();
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
