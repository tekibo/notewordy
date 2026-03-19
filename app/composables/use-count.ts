export function useCount(content: Ref<string>) {
    const { wordsPerPage } = useSettings();
    const debouncedContent = refDebounced(content, 500);


    const wordCount = computed(() => debouncedContent.value.split(" ").length - 1);
    const pageCount = computed(() => Math.ceil(debouncedContent.value.length / wordsPerPage.value));

    return {
        wordCount,
        pageCount,
    }
}