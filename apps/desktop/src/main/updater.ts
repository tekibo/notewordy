import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { Updater, Utils } from "electrobun/main";
import type { UpdateCheckResult, UpdateApplyResult } from "../shared/types";

export async function checkForUpdates(): Promise<UpdateCheckResult> {
    try {
        const local = await Updater.getLocalInfo();
        const update = await Updater.checkForUpdate();
        return {
            currentVersion: local.version || "0.0.1",
            updateAvailable: Boolean(update.updateAvailable),
            latestVersion: update.version || undefined,
            error: update.error || undefined,
        };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to check for updates";
        return {
            currentVersion: "0.0.1",
            updateAvailable: false,
            error: message,
        };
    }
}

export async function applyUpdate(): Promise<UpdateApplyResult> {
    try {
        await Updater.downloadUpdate();
        const info = Updater.updateInfo();
        if (info.updateReady) {
            await Updater.applyUpdate();
            return { success: true };
        }
        return { success: false, error: info.error || "Update download failed or not ready" };
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to apply update";
        return { success: false, error: message };
    }
}

export async function uninstallApp(options: { purgeData: boolean }): Promise<void> {
    const base = Utils.paths.userData;
    if (!base) {
        throw new Error("Fatal: Electrobun Utils.paths.userData is unavailable");
    }

    if (options.purgeData) {
        const notesDir = join(base, "notes");
        if (existsSync(notesDir)) {
            rmSync(notesDir, { recursive: true, force: true });
        }
        const settingsFile = join(base, "settings.json");
        if (existsSync(settingsFile)) {
            rmSync(settingsFile, { force: true });
        }
    }

    const isWindows = process.platform === "win32";
    const uninstallerName = isWindows ? "uninstall.exe" : "uninstall";
    const uninstallerPath = join(base, uninstallerName);

    if (existsSync(uninstallerPath)) {
        spawn(uninstallerPath, ["--uninstall", "--quiet"], {
            detached: true,
            stdio: "ignore",
        }).unref();
    }

    process.exit(0);
}
