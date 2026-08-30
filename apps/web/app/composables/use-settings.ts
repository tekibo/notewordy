import { APP_CONSTANTS } from '../utils/constants';

export function useSettings() {
    const wordsPerPage = useState<number>('wordsPerPage', () => 300);
    const assameseMode = useState<boolean>('assameseMode', () => false);
    const fontSize = useState<number>('fontSize', () => APP_CONSTANTS.DEFAULT_FONT_SIZE);
    const loaded = useState<boolean>('settingsLoaded', () => false);

    const loadSettings = async () => {
        const { rpc } = useElectrobun();
        if (!rpc) return;

        try {
            const settings = await rpc.request.getSettings({});
            if (settings) {
                wordsPerPage.value = settings.wordsPerPage;
                assameseMode.value = settings.assameseMode;
                fontSize.value = settings.fontSize;
                loaded.value = true;
            }
        } catch (e) {
            console.error("Failed to load settings:", e);
        }
    };

    const setWordsPerPage = async (value: number) => {
        if (value < 1) return;
        wordsPerPage.value = value;
        const { rpc } = useElectrobun();
        if (rpc) {
            await rpc.request.updateSettings({ settings: { wordsPerPage: value } });
        }
    };

    const setAssameseMode = async (value: boolean) => {
        assameseMode.value = value;
        const { rpc } = useElectrobun();
        if (rpc) {
            await rpc.request.updateSettings({ settings: { assameseMode: value } });
        }
    };

    const setFontSize = async (value: number) => {
        if (value < APP_CONSTANTS.MIN_FONT_SIZE || value > APP_CONSTANTS.MAX_FONT_SIZE) return;
        fontSize.value = value;
        const { rpc } = useElectrobun();
        if (rpc) {
            await rpc.request.updateSettings({ settings: { fontSize: value } });
        }
    };

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
        loadSettings,
    };
}