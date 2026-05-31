<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
defineProps<{
    count: number;
    title: string
}>();
</script>

<template>
    <div class="cursor-default flex items-center gap-2">
        <span class="text-xs text-muted-foreground">{{ title }}</span>
        <NumberFlow :value="count" class="text-xs" />
    </div>
</template>
