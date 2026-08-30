import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Utils } from "electrobun/main";
import type { AppSettings } from "../shared/types";

const defaultSettings: AppSettings = {
    wordsPerPage: 300,
    assameseMode: false,
    fontSize: 16,
};

function getSettingsFile(): string {
    const base = Utils.paths.userData;
    if (!base) {
        throw new Error("Fatal: Electrobun Utils.paths.userData is unavailable");
    }
    if (!existsSync(base)) {
        mkdirSync(base, { recursive: true });
    }
    return join(base, "settings.json");
}

export function getSettings(): AppSettings {
    const file = getSettingsFile();
    if (!existsSync(file)) return defaultSettings;
    try {
        const raw = readFileSync(file, "utf-8");
        return { ...defaultSettings, ...JSON.parse(raw) };
    } catch (e) {
        console.error("Failed to read settings:", e);
        return defaultSettings;
    }
}

export function saveSettings(settings: Partial<AppSettings>): { success: boolean } {
    const current = getSettings();
    const updated: AppSettings = { ...current, ...settings };
    writeFileSync(getSettingsFile(), JSON.stringify(updated, null, 2), "utf-8");
    return { success: true };
}
