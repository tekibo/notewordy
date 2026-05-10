export function useSettings() {
    const wordsPerPage = useState<number>('wordsPerPage', () => 300);
    const assameseMode = useState<boolean>('assameseMode', () => false);
    const loaded = useState<boolean>('settingsLoaded', () => false);

    const loadSettings = async () => {
        if (typeof window === 'undefined' || !window.electron) return;
        const settings = await window.electron.settings.get();
        if (settings) {
            wordsPerPage.value = settings.wordsPerPage;
            assameseMode.value = settings.assameseMode ?? false;
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

    // Initial load
    if (process.client && !loaded.value) {
        loadSettings();
    }

    return {
        wordsPerPage,
        assameseMode,
        setWordsPerPage,
        setAssameseMode,
        loadSettings
    }
}