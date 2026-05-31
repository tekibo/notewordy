import { app, BrowserWindow, Menu, nativeTheme } from 'electron';
import { isDev } from './util.js';
import { getIconPath, getPreloadPath, getSafePath } from './path-resolver.js';
import { createSplash } from './splash/index.js';
import { setupIpcHandlers } from './src/index.js';

function updateTitlebarOverlay(win: BrowserWindow) {
    const isDark = nativeTheme.shouldUseDarkColors;
    win.setTitleBarOverlay({
        color: '#00000000',
        symbolColor: isDark ? '#fafafa' : '#09090b',
        height: 42,
    });
}

app.on('ready', () => {

    setupIpcHandlers();

    Menu.setApplicationMenu(null)

    const mainWindow = new BrowserWindow({
        show: false,
        icon: getIconPath(),
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: '#00000000',
            symbolColor: '#fafafa',
            height: 42
        },
        webPreferences: {
            preload: getPreloadPath()
        },
    });

    updateTitlebarOverlay(mainWindow);

    nativeTheme.on('updated', () => {
        updateTitlebarOverlay(mainWindow);
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:3000');
    } else {
        mainWindow.loadFile(getSafePath('/dist-nuxt/public/index.html'));
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
