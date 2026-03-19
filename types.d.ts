type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _search?: string;
};

type EventPayloadMapping = {
    nuxtReady: () => Promise<void>;
    electronReady: () => Promise<boolean>;
    listNotes: () => Promise<Note[]>;
    saveNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    saveAllNotes: (notes: Note[]) => Promise<void>;
}

interface Window {
    electron: {
        nuxtReady: EventPayloadMapping['nuxtReady'];
        electronReady: EventPayloadMapping['electronReady'];
        notes: {
            saveAllNotes: EventPayloadMapping['saveAllNotes'];
            list: EventPayloadMapping['listNotes'];
            save: EventPayloadMapping['saveNote'];
            delete: EventPayloadMapping['deleteNote'];
        }
    }
}