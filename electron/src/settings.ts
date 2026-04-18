import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { app } from "electron";
import path from "path";

const DEFAULT_SETTINGS: AppSettings = {
    wordsPerPage: 300
};

function getSettingsFile() {
    const configDir = path.join(app.getPath('userData'), 'notewordy');
    if (!existsSync(configDir)) {
        mkdirSync(configDir, { recursive: true });
    }
    return path.join(configDir, 'settings.json');
}

export function getSettings(): AppSettings {
    const file = getSettingsFile();
    if (!existsSync(file)) {
        return DEFAULT_SETTINGS;
    }
    try {
        const data = JSON.parse(readFileSync(file, 'utf-8'));
        return { ...DEFAULT_SETTINGS, ...data };
    } catch (e) {
        console.error("Failed to read settings:", e);
        return DEFAULT_SETTINGS;
    }
}

export function saveSettings(settings: Partial<AppSettings>) {
    const current = getSettings();
    const updated = { ...current, ...settings };
    writeFileSync(getSettingsFile(), JSON.stringify(updated, null, 2));
}
