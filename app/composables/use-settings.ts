export function useSettings() {
    const wordsPerPage = useState<number>('wordsPerPage', () => 450);

    const setWordsPerPage = (value: number) => {
        if (value < 1) return;
        wordsPerPage.value = value;
    }

    return {
        wordsPerPage,
        setWordsPerPage
    }
}