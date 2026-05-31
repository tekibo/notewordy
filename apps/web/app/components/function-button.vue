<script setup lang="ts">
defineProps<{name:string; description:string; onClick: ()=> void}>();
</script>

<template>
  <button @click=onClick
            class="group flex items-center gap-4 p-5 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-md hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 text-left">
        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <slot name="icon"/>
        </div>
        <div class="min-w-0">
            <h3 class="font-bold text-sm mb-0.5">{{ name }}</h3>
            <p class="text-[10px] text-muted-foreground/50 leading-tight">{{ description }}</p>
        </div>
</button>
</template>