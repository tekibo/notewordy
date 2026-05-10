type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _search?: string;
};

type AppSettings = {
    wordsPerPage: number;
    assameseMode: boolean;
};

type EventPayloadMapping = {
    nuxtReady: () => Promise<void>;
    electronReady: () => Promise<boolean>;
    listNotes: () => Promise<Note[]>;
    saveNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    saveAllNotes: (notes: Note[]) => Promise<void>;
    backupNotes: (options?: { includeSettings?: boolean }) => Promise<boolean>;
    importNotes: () => Promise<boolean>;
    windowMinimize: () => Promise<void>;
    windowMaximize: () => Promise<void>;
    windowClose: () => Promise<void>;
    getSettings: () => Promise<AppSettings>;
    updateSettings: (settings: Partial<AppSettings>) => Promise<void>;
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
            backup: EventPayloadMapping['backupNotes'];
            import: EventPayloadMapping['importNotes'];
        };
        settings: {
            get: EventPayloadMapping['getSettings'];
            update: EventPayloadMapping['updateSettings'];
        };
        window: {
            minimize: EventPayloadMapping['windowMinimize'];
            maximize: EventPayloadMapping['windowMaximize'];
            close: EventPayloadMapping['windowClose'];
        };
    }
}