<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const isVisible = computed(() => y.value > 200)

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<template>
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="translate-y-10 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-10 opacity-0">
        <button v-if="isVisible" @click="scrollToTop"
            class="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background/70 border border-border/50 backdrop-blur-md shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95 group"
            aria-label="Scroll to top">
            <Icon icon="lucide:arrow-up"
                class="h-5 w-5 text-foreground/70 group-hover:text-foreground transition-colors" />
        </button>
    </Transition>
</template>
