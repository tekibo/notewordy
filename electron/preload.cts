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
        backup: (options?: { includeSettings?: boolean }) => electron.ipcRenderer.invoke("backupNotes", options),
        import: () => electron.ipcRenderer.invoke("importNotes")
    },
    settings: {
        get: () => electron.ipcRenderer.invoke("getSettings"),
        update: (settings: Partial<AppSettings>) => electron.ipcRenderer.invoke("updateSettings", settings)
    },
    window: {
        minimize: () => electron.ipcRenderer.invoke("windowMinimize"),
        maximize: () => electron.ipcRenderer.invoke("windowMaximize"),
        close: () => electron.ipcRenderer.invoke("windowClose")
    }
} satisfies Window['electron']);