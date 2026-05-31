export function useActiveNoteState() {
    const activeNoteId = useState<string | null>('active-note-id', () => null);
    const activeNoteTitle = useState<string>('active-note-title', () => '');
    const activeNoteContent = useState<string>('active-note-content', () => '');

    return {
        activeNoteId,
        activeNoteTitle,
        activeNoteContent,
    }
}
