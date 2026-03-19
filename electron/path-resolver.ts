import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";

export function getPreloadPath() {
    return getSafePath('/dist-electron/preload.cjs')
}

export function getIconPath() {
    return getSafePath('/desktopIcon.png')
}

export function getSafePath(path: string) {
    return getRelativePath(
        isDev() ? '.' : '..',
        path
    )
}

export function getRelativePath(...val: string[]) {
    return path.join(app.getAppPath(), ...val)
}