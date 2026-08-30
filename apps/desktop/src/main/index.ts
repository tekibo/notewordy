import { BrowserView, BrowserWindow, ApplicationMenu } from "electrobun/main";
import type { NotewordyRPC } from "../shared/types";
import { listNotes, saveNote, saveAllNotes, deleteNote, backupNotes, importNotes } from "./notes";
import { getSettings, saveSettings } from "./settings";
import { checkForUpdates, applyUpdate, uninstallApp } from "./updater";

let mainWindow: BrowserWindow | null = null;

const notewordyRPC = BrowserView.defineRPC<NotewordyRPC>({
    maxRequestTime: 60000,
    handlers: {
        requests: {
            nuxtReady: () => {
                if (mainWindow) {
                    mainWindow.show();
                    mainWindow.activate();
                }
            },
            listNotes: () => listNotes(),
            saveNote: ({ note }) => saveNote(note),
            saveAllNotes: ({ notes }) => saveAllNotes(notes),
            deleteNote: ({ id }) => deleteNote(id),
            backupNotes: (options) => backupNotes(options),
            importNotes: () => importNotes(),
            getSettings: () => getSettings(),
            updateSettings: ({ settings }) => saveSettings(settings),
            checkForUpdates: () => checkForUpdates(),
            applyUpdate: () => applyUpdate(),
            uninstallApp: ({ purgeData }) => uninstallApp({ purgeData }),
            windowMinimize: () => {
                mainWindow?.minimize();
            },
            windowMaximize: () => {
                if (mainWindow) {
                    if (mainWindow.isMaximized()) {
                        mainWindow.unmaximize();
                    } else {
                        mainWindow.maximize();
                    }
                }
            },
            windowClose: () => {
                mainWindow?.close();
            },
        },
        messages: {},
    },
});

async function resolveAppUrl(): Promise<string> {
    try {
        const res = await fetch("http://localhost:3000", { method: "HEAD" });
        if (res.ok || res.status === 200 || res.status === 304) {
            console.log("Connected to Nuxt dev server at http://localhost:3000");
            return "http://localhost:3000";
        }
    } catch {}
    console.log("Loading packaged views://mainview/index.html");
    return "views://mainview/index.html";
}

async function init() {
    const url = await resolveAppUrl();

    mainWindow = new BrowserWindow({
        title: "NoteWordy",
        url,
        rpc: notewordyRPC,
        hidden: true,
        frame: {
            width: 1050,
            height: 720,
        },
    });
}

init();

ApplicationMenu.setApplicationMenu([
    {
        label: "NoteWordy",
        submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "showAll" },
            { type: "separator" },
            { role: "quit" },
        ],
    },
    {
        label: "File",
        submenu: [
            { role: "close" },
        ],
    },
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "selectAll" },
        ],
    },
    {
        label: "View",
        submenu: [
            { role: "toggleFullScreen" },
        ],
    },
]);
