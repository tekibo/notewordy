import { BrowserWindow, ipcMain } from 'electron';
import { buildSplashHtml, type SplashConfig } from './template.js';

export type SplashScreenOptions = {
    width?: number;
    height?: number;
    mainWindow: BrowserWindow;
    config?: Partial<SplashConfig>;
}

export function createSplash(options: SplashScreenOptions) {
    const { width = 425, height = 325, config, mainWindow } = options;

    const splashScreen = new BrowserWindow({
        width,
        height,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        resizable: false,
        skipTaskbar: true,
        center: true,
        webPreferences: {
            contextIsolation: true,
        },
    });

    const html = buildSplashHtml(config);
    splashScreen.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);

    splashScreen.show();

    const hide = () => {
        if (splashScreen.isDestroyed()) {
            mainWindow.show();
            return;
        }

        splashScreen.once('closed', () => {
            mainWindow.show();
        });

        splashScreen.close();
    };

    const timeout = setTimeout(() => {
        console.warn('Splash timeout — forcing app to show');
        hide();
    }, 10000);

    const listener = () => {
        clearTimeout(timeout);
        hide();
    };

    ipcMain.once("nuxtReady", listener);

    splashScreen.on('closed', () => {
        ipcMain.removeListener("nuxtReady", listener);
    });
}
export type { SplashConfig } from './template.js';
