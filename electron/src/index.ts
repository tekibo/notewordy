import { app } from "electron";
import { listNotes, saveNote, deleteNote, saveAllNotes, backupNotes, importNotes } from "./notes.js";
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

    ipcHandle("backupNotes", async () => {
        return backupNotes();
    });

    ipcHandle("importNotes", async () => {
        return importNotes();
    });
}