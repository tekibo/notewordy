import { APP_CONSTANTS } from '../utils/constants';

export function useSettings() {
    const wordsPerPage = useState<number>('wordsPerPage', () => 300);
    const assameseMode = useState<boolean>('assameseMode', () => false);
    const fontSize = useState<number>('fontSize', () => APP_CONSTANTS.DEFAULT_FONT_SIZE);
    const loaded = useState<boolean>('settingsLoaded', () => false);

    const loadSettings = async () => {
        if (typeof window === 'undefined' || !window.electron) return;
        const settings = await window.electron.settings.get();
        if (settings) {
            wordsPerPage.value = settings.wordsPerPage ?? 300;
            assameseMode.value = settings.assameseMode ?? false;
            fontSize.value = settings.fontSize ?? APP_CONSTANTS.DEFAULT_FONT_SIZE;
            loaded.value = true;
        }
    }

    const setWordsPerPage = async (value: number) => {
        if (value < 1) return;
        wordsPerPage.value = value;
        if (typeof window !== 'undefined' && window.electron) {
            await window.electron.settings.update({ wordsPerPage: value });
        }
    }

    const setAssameseMode = async (value: boolean | unknown) => {
        const boolValue = !!value;
        assameseMode.value = boolValue;
        if (typeof window !== 'undefined' && window.electron) {
            await window.electron.settings.update({ assameseMode: boolValue });
        }
    }

    const setFontSize = async (value: number) => {
        if (value < APP_CONSTANTS.MIN_FONT_SIZE || value > APP_CONSTANTS.MAX_FONT_SIZE) return;
        fontSize.value = value;
        if (typeof window !== 'undefined' && window.electron) {
            await window.electron.settings.update({ fontSize: value });
        }
    }

    // Initial load
    if (process.client && !loaded.value) {
        loadSettings();
    }

    return {
        wordsPerPage,
        assameseMode,
        fontSize,
        setWordsPerPage,
        setAssameseMode,
        setFontSize,
        loadSettings
    }
}