const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    ready: () => electron.ipcRenderer.send('ready')
})