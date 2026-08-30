import type { RPCSchema } from "electrobun/view";

export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    _search?: string;
};

export type AppSettings = {
    wordsPerPage: number;
    assameseMode: boolean;
    fontSize: number;
};

export type BackupPayload = {
    version: string;
    notes: Note[];
    settings?: AppSettings;
};

export type NotewordyRPC = {
    bun: RPCSchema<{
        requests: {
            nuxtReady: {
                params: {};
                response: void;
            };
            listNotes: {
                params: {};
                response: Note[];
            };
            saveNote: {
                params: { note: Note };
                response: { success: boolean };
            };
            saveAllNotes: {
                params: { notes: Note[] };
                response: { success: boolean };
            };
            deleteNote: {
                params: { id: string };
                response: { success: boolean };
            };
            backupNotes: {
                params: { includeSettings?: boolean };
                response: boolean;
            };
            importNotes: {
                params: {};
                response: boolean;
            };
            getSettings: {
                params: {};
                response: AppSettings;
            };
            updateSettings: {
                params: { settings: Partial<AppSettings> };
                response: { success: boolean };
            };
            windowMinimize: {
                params: {};
                response: void;
            };
            windowMaximize: {
                params: {};
                response: void;
            };
            windowClose: {
                params: {};
                response: void;
            };
        };
        messages: {};
    }>;
    webview: RPCSchema<{
        requests: {};
        messages: {};
    }>;
};
