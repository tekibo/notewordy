import type { Note } from '../../../desktop/src/shared/types';

export const normalizeNote = (note: Note): Note => ({
    ...note,
    _search: (note.title + " " + note.content).toLowerCase(),
});

export const sortNotes = (notes: Note[]): void => {
    notes.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
};

export const formatForIpc = (notes: Note[]): Note[] => JSON.parse(JSON.stringify(notes)) as Note[];
