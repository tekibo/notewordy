const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    nuxtReady: () => electron.ipcRenderer.send("nuxtReady"),
    electronReady: () => electron.ipcRenderer.invoke("electronReady"),
    notes: {
        saveAllNotes: (notes: Note[]) => electron.ipcRenderer.invoke("saveAllNotes", notes),
        list: () => electron.ipcRenderer.invoke("listNotes"),
        save: (note: Note) => electron.ipcRenderer.invoke("saveNote", note),
        delete: (id: string) => electron.ipcRenderer.invoke("deleteNote", id)
    }
} satisfies Window['electron']);