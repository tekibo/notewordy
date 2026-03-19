import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { app } from "electron";
import path from "path";

function getNotesDir() {
    const noteDir = path.join(app.getPath('userData'), 'notewordy', 'notes');
    if (!existsSync(noteDir)) {
        mkdirSync(noteDir, { recursive: true });
    }
    return noteDir;
}

function getNoteFile(id: string) {
    return path.join(getNotesDir(), `${id}.json`);
}

function readNote(id: string): Note {
    return JSON.parse(readFileSync(getNoteFile(id), 'utf-8')) as Note;
}

function listNotes(): Note[] {
    return readdirSync(getNotesDir())
        .filter((file) => file.endsWith('.json'))
        .map((file) => readNote(path.basename(file, '.json')));
}

function saveNote(note: Note) {
    writeFileSync(getNoteFile(note.id), JSON.stringify(note, null, 2));
}

function saveAllNotes(notes: Note[]) {
    notes.forEach((note) => saveNote(note));
}

function deleteNote(id: string) {
    unlinkSync(getNoteFile(id));
}

export { listNotes, saveNote, saveAllNotes, deleteNote };