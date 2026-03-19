<script setup lang="ts">

onMounted(() => {
  window.electron.nuxtReady();
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
