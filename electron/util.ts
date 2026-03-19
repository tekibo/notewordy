import { ipcMain } from "electron";
import type { IpcMainInvokeEvent } from "electron";

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