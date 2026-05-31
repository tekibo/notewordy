const isMac = typeof navigator !== 'undefined' && navigator.platform.startsWith('Mac');

export const metaKey = isMac ? '⌘' : 'Ctrl';

export interface ShortcutDef {
    key: string;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    description: string;
    label: string;
}

export const SHORTCUTS = {
    'new-note': {
        key: 'n',
        meta: true,
        description: 'Create a new note',
        label: `${metaKey}+N`,
    },
    'toggle-assamese': {
        key: 'e',
        meta: true,
        description: 'Toggle Assamese transliteration mode',
        label: `${metaKey}+E`,
    },
    'focus-search': {
        key: 'f',
        meta: true,
        shift: true,
        description: 'Focus the search bar',
        label: `${metaKey}+Shift+F`,
    },
    'open-settings': {
        key: ',',
        meta: true,
        description: 'Open settings',
        label: `${metaKey}+,`,
    },
    'open-converter': {
        key: 'c',
        meta: true,
        shift: true,
        description: 'Open font converter',
        label: `${metaKey}+Shift+C`,
    },
    'go-home': {
        key: '\\',
        meta: true,
        description: 'Go to home',
        label: `${metaKey}+\\`,
    },
    'open-shortcuts': {
        key: '/',
        meta: true,
        description: 'Open shortcuts reference',
        label: `${metaKey}+/`,
    },
    'open-keyboard-layout': {
        key: 'k',
        meta: true,
        description: 'Open keyboard layout guide',
        label: `${metaKey}+K`,
    },
} as const satisfies Record<string, ShortcutDef>;

export type ShortcutId = keyof typeof SHORTCUTS;

export function matchShortcut(e: KeyboardEvent): ShortcutId | null {
    for (const [id, def] of Object.entries(SHORTCUTS)) {
        const keyMatch = e.key.toLowerCase() === def.key.toLowerCase();
        const metaMatch = !!def.meta === (e.metaKey || e.ctrlKey);
        const shiftMatch = !!def.shift === e.shiftKey;
        const altMatch = (def.alt ?? false) === e.altKey;
        if (keyMatch && metaMatch && shiftMatch && altMatch) {
            return id as ShortcutId;
        }
    }
    return null;
}
