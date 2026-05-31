import { matchShortcut, type ShortcutId } from '~/utils/shortcuts';

export function useShortcuts(handlers: Partial<Record<ShortcutId, () => void>>) {
    const onKeydown = (e: KeyboardEvent) => {
        const id = matchShortcut(e);
        if (id && handlers[id]) {
            e.preventDefault();
            handlers[id]!();
        }
    };

    onMounted(() => {
        window.addEventListener('keydown', onKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', onKeydown);
    });
}
