export function useSettings() {
    const wordsPerPage = useState<number>('wordsPerPage', () => 300);
    const loaded = useState<boolean>('settingsLoaded', () => false);

    const loadSettings = async () => {
        if (typeof window === 'undefined' || !window.electron) return;
        const settings = await window.electron.settings.get();
        if (settings) {
            wordsPerPage.value = settings.wordsPerPage;
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

    // Initial load
    if (process.client && !loaded.value) {
        loadSettings();
    }

    return {
        wordsPerPage,
        setWordsPerPage,
        loadSettings
    }
}