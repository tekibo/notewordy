import { transliterateAssamese } from '@notewordy/transliterate_as';

export function useAssamese() {
    const { assameseMode } = useSettings();

    /**
     * Applies Assamese transliteration to an input element.
     * This handles selection state to ensure the cursor doesn't jump.
     */
    const handleAssameseInput = (e: Event, onUpdate: (value: string) => void) => {
        if (!assameseMode.value) return;

        const target = e.target as HTMLTextAreaElement | HTMLInputElement;
        if (!target) return;

        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? 0;
        const scrollTop = target.scrollTop;
        const originalText = target.value;

        // Transform the entire text
        const transformedText = transliterateAssamese(originalText);

        if (transformedText === originalText) return;

        // Update the value via the callback (usually to update a ref)
        onUpdate(transformedText);

        // We need to wait for Vue to update the DOM before restoring selection
        nextTick(() => {
            if (start === 0 && end === originalText.length) {
                target.selectionStart = 0;
                target.selectionEnd = target.value.length;
            } else {
                let beforeCursorOriginal = originalText.substring(0, start);
                const transformedBeforeCursor = transliterateAssamese(beforeCursorOriginal);
                target.selectionStart = target.selectionEnd = transformedBeforeCursor.length;
            }
            target.scrollTop = scrollTop;
        });
    };

    return {
        assameseMode,
        handleAssameseInput,
        transliterateAssamese
    };
}
