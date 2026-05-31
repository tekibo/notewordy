import { ipcMain } from "electron";
import type { IpcMainInvokeEvent, WebContents } from "electron";

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    listener: (
        event: IpcMainInvokeEvent,
        ...args: Parameters<EventPayloadMapping[Key]>
    ) => ReturnType<EventPayloadMapping[Key]>
) {
    ipcMain.handle(key, listener);
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key]
) {
    webContents.send(key, payload)
}
