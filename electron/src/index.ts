import { app, BrowserWindow } from "electron";
import { listNotes, saveNote, deleteNote, saveAllNotes, backupNotes, importNotes } from "./notes.js";
import { getSettings, saveSettings } from "./settings.js";
import { ipcHandle } from "../util.js";

export function setupIpcHandlers() {
    ipcHandle('electronReady', async () => {
        return app.isReady()
    })

    ipcHandle("listNotes", async () => {
        return listNotes();
    });

    ipcHandle("saveNote", async (_, note: Note) => {
        saveNote(note);
    });

    ipcHandle("deleteNote", async (_, id: string) => {
        deleteNote(id);
    });

    ipcHandle("saveAllNotes", async (_, notes: Note[]) => {
        saveAllNotes(notes);
    });

    ipcHandle("backupNotes", async (_, options?: { includeSettings?: boolean }) => {
        return backupNotes(options);
    });

    ipcHandle("importNotes", async () => {
        return importNotes();
    });

    ipcHandle("getSettings", async () => {
        return getSettings();
    });

    ipcHandle("updateSettings", async (_, settings: Partial<AppSettings>) => {
        saveSettings(settings);
    });

    ipcHandle("windowMinimize", async () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) win.minimize();
    });

    ipcHandle("windowMaximize", async () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            if (win.isMaximized()) {
                win.restore();
            } else {
                win.maximize();
            }
        }
    });

    ipcHandle("windowClose", async () => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) win.close();
    });
}