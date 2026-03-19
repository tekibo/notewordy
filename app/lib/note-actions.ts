export const normalizeNote = (note: Note): Note => ({
    ...note,
    _search: (note.title + " " + note.content).toLowerCase()
});

export const sortNotes = (notes: Note[]) => {
    notes.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
};

export const formatForIpc = (notes: Note[]) => JSON.parse(JSON.stringify(notes));
