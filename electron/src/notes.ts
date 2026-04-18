import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { app, dialog } from "electron";
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
    
async function backupNotes() {
    const notes = listNotes();
    const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'Backup Notes',
        defaultPath: 'notewordy-backup.json',
        filters: [{ name: 'JSON', extensions: ['json'] }]
    });

    if (canceled || !filePath) return false;

    try {
        writeFileSync(filePath, JSON.stringify({ version: '1.0', notes }, null, 2));
        return true;
    } catch (error) {
        console.error('Failed to backup notes:', error);
        return false;
    }
}

async function importNotes() {
    const { filePaths, canceled } = await dialog.showOpenDialog({
        title: 'Import Notes',
        filters: [{ name: 'JSON', extensions: ['json'] }],
        properties: ['openFile']
    });

    if (canceled || filePaths.length === 0) return false;

    try {
        const content = readFileSync(filePaths[0], 'utf-8');
        const data = JSON.parse(content);

        if (!data.notes || !Array.isArray(data.notes)) {
            throw new Error('Invalid backup file format');
        }

        const notes = data.notes as Note[];
        
        // Remove existing notes first? Or just overwrite?
        // The user wants to "overwrite all current data into the new data".
        // So I should probably clear the notes directory first.
        const currentNotes = readdirSync(getNotesDir()).filter(f => f.endsWith('.json'));
        currentNotes.forEach(f => unlinkSync(path.join(getNotesDir(), f)));

        notes.forEach(note => saveNote(note));
        return true;
    } catch (error) {
        console.error('Failed to import notes:', error);
        return false;
    }
}

export { listNotes, saveNote, saveAllNotes, deleteNote, backupNotes, importNotes };