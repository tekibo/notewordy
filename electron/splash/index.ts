import { BrowserWindow, ipcMain } from 'electron';
import { buildSplashHtml, type SplashConfig } from './template.js';

export type SplashScreenOptions = {
    /** Splash window width (default: 425) */
    width?: number;
    /** Splash window height (default: 325) */
    height?: number;
    /** Main window to show after splash screen */
    mainWindow: BrowserWindow;
    /**
     * Splash template config
     * 
     * ```ts
     * type SplashConfig = {
     *      appName: string; 
     *      tagline?: string;
     *      brandColor?: string; 
     *      neutralColor?: string; 
     *      template?: 'gradient' | 'solid' | 'mesh' | 'dots' | 'glass';
     *      icon?: string; 
     *  }
     * ```
     */
    config?: Partial<SplashConfig>;
}

/**
 * Creates a splash screen window and returns helpers to manage it.
 *
 * Usage:
 * ```ts
 * const splash = createSplash();
 * // ... create & load your main window ...
 * splash.close();
 * ```
 */
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

        // ensure no overlap / flicker
        splashScreen.once('closed', () => {
            mainWindow.show();
        });

        splashScreen.close();
    };

    // fallback: prevent permanent hang
    const timeout = setTimeout(() => {
        console.warn('Splash timeout — forcing app to show');
        hide();
    }, 10000);

    const listener = () => {
        clearTimeout(timeout);
        hide();
    };

    ipcMain.once('ready', listener);

    splashScreen.on('closed', () => {
        ipcMain.removeListener('ready', listener);
    });
}
export type { SplashConfig } from './template.js';
