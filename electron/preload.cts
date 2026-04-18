const electron = require('electron');
//const { createTitlebarOnDOMContentLoaded } = require('custom-electron-titlebar');

// Initialize the custom titlebar
// createTitlebarOnDOMContentLoaded();

electron.contextBridge.exposeInMainWorld('electron', {
    nuxtReady: () => electron.ipcRenderer.send("nuxtReady"),
    electronReady: () => electron.ipcRenderer.invoke("electronReady"),
    notes: {
        saveAllNotes: (notes: Note[]) => electron.ipcRenderer.invoke("saveAllNotes", notes),
        list: () => electron.ipcRenderer.invoke("listNotes"),
        save: (note: Note) => electron.ipcRenderer.invoke("saveNote", note),
        delete: (id: string) => electron.ipcRenderer.invoke("deleteNote", id),
        backup: () => electron.ipcRenderer.invoke("backupNotes"),
        import: () => electron.ipcRenderer.invoke("importNotes")
    }
} satisfies Window['electron']);