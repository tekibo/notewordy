import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { Utils } from "electrobun/main";
import type { Note, BackupPayload } from "../shared/types";
import { getSettings, saveSettings } from "./settings";

function getNotesDir(): string {
    const base = Utils.paths.userData;
    if (!base) {
        throw new Error("Fatal: Electrobun Utils.paths.userData is unavailable");
    }
    const noteDir = join(base, "notes");
    if (!existsSync(noteDir)) {
        mkdirSync(noteDir, { recursive: true });
    }
    return noteDir;
}

function getNoteFile(id: string): string {
    return join(getNotesDir(), `${id}.json`);
}

function readNote(id: string): Note | null {
    const file = getNoteFile(id);
    if (!existsSync(file)) return null;
    try {
        return JSON.parse(readFileSync(file, "utf-8")) as Note;
    } catch (e) {
        console.error(`Failed to parse note ${id}:`, e);
        return null;
    }
}

export function listNotes(): Note[] {
    const dir = getNotesDir();
    const files = readdirSync(dir).filter((file) => file.endsWith(".json"));
    const notes: Note[] = [];
    for (const file of files) {
        const id = basename(file, ".json");
        const note = readNote(id);
        if (note) notes.push(note);
    }
    return notes;
}

export function saveNote(note: Note): { success: boolean } {
    writeFileSync(getNoteFile(note.id), JSON.stringify(note, null, 2), "utf-8");
    return { success: true };
}

export function saveAllNotes(notes: Note[]): { success: boolean } {
    for (const note of notes) {
        saveNote(note);
    }
    return { success: true };
}

export function deleteNote(id: string): { success: boolean } {
    const file = getNoteFile(id);
    if (existsSync(file)) {
        unlinkSync(file);
        return { success: true };
    }
    return { success: false };
}

export async function backupNotes(options?: { includeSettings?: boolean }): Promise<boolean> {
    const notes = listNotes();
    const chosenFolders = await Utils.openFileDialog({
        startingFolder: Utils.paths.documents,
        canChooseFiles: false,
        canChooseDirectory: true,
        allowsMultipleSelection: false,
    });

    if (!chosenFolders || chosenFolders.length === 0 || !chosenFolders[0]) {
        return false;
    }

    try {
        const backupData: BackupPayload = { version: "1.1", notes };
        if (options?.includeSettings) {
            backupData.settings = getSettings();
        }

        const filePath = join(chosenFolders[0], "notewordy-backup.json");
        writeFileSync(filePath, JSON.stringify(backupData, null, 2), "utf-8");
        Utils.showNotification({
            title: "NoteWordy Backup",
            body: `Backup saved to ${filePath}`,
        });
        return true;
    } catch (error) {
        console.error("Failed to backup notes:", error);
        return false;
    }
}

export async function importNotes(): Promise<boolean> {
    const chosenFiles = await Utils.openFileDialog({
        startingFolder: Utils.paths.documents,
        allowedFileTypes: "json",
        canChooseFiles: true,
        canChooseDirectory: false,
        allowsMultipleSelection: false,
    });

    if (!chosenFiles || chosenFiles.length === 0 || !chosenFiles[0]) {
        return false;
    }

    try {
        const content = readFileSync(chosenFiles[0], "utf-8");
        const data = JSON.parse(content) as BackupPayload;

        if (!data.notes || !Array.isArray(data.notes)) {
            throw new Error("Invalid backup file format");
        }

        const notes = data.notes;
        const notesDir = getNotesDir();
        const currentNotes = readdirSync(notesDir).filter((f) => f.endsWith(".json"));
        for (const f of currentNotes) {
            unlinkSync(join(notesDir, f));
        }

        for (const note of notes) {
            saveNote(note);
        }

        if (data.settings) {
            saveSettings(data.settings);
        }

        Utils.showNotification({
            title: "NoteWordy Import",
            body: `Successfully imported ${notes.length} notes`,
        });

        return true;
    } catch (error) {
        console.error("Failed to import notes:", error);
        return false;
    }
}
