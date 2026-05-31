<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
defineProps<{
    count: number;
    title: string
}>();
</script>

<template>
    <div class="cursor-default flex items-center rounded-md bg-card/70 backdrop-blur-lg shadow-2xl ring-muted ring-1">
        <div class="p-2 flex items-center justify-center flex-1">
            <span class="text-sm text-muted-foreground">{{ title }}</span>
        </div>
        <div class="h-full w-px bg-muted"></div>
        <div class="flex items-center justify-center p-2 px-4 flex-1">
            <NumberFlow :value="count" />
        </div>
    </div>
</template>
