import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import { getPreloadPath, getRelativePath } from './path-resolver.js';
import { createSplash } from './splash/index.js';

app.on('ready', () => {

    const mainWindow = new BrowserWindow({
        show: false,
        skipTaskbar: isDev() ? false : true,
        webPreferences: {
            preload: getPreloadPath()
        },
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadFile(getRelativePath('/dist-nuxt/public/index.html'));
    }

    createSplash({
        mainWindow,
        config: {
            appName: 'NoteWordy',
            tagline: 'Write beautifully',
            brandColor: '#537fe7',
            neutralColor: '#0f172a',
            template: 'mesh',
            icon: `
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            `,
        }
    });


});