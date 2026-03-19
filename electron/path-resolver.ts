import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";

export function getPreloadPath() {
    return getRelativePath(
        isDev() ? '.' : '..',
        '/dist-electron/preload.cjs'
    )
}

export function getRelativePath(...val: string[]) {
    return path.join(app.getAppPath(), ...val)
}