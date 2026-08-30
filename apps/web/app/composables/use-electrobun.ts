import "electrobun/view";
import { Electroview } from "electrobun/view";
import type { NotewordyRPC } from "../../../desktop/src/shared/types";

let rpcInstance: ReturnType<typeof Electroview.defineRPC<NotewordyRPC>> | null = null;

export function useElectrobun() {
    if (typeof window === "undefined") {
        return { rpc: null, isElectrobun: false };
    }

    const isElectrobun = typeof window.__electrobunWebviewId === "number";

    if (isElectrobun && !rpcInstance) {
        rpcInstance = Electroview.defineRPC<NotewordyRPC>({
            maxRequestTime: 30000,
            handlers: {
                requests: {},
                messages: {},
            },
        });

        new Electroview({ rpc: rpcInstance });
    }

    return {
        rpc: rpcInstance,
        isElectrobun,
    };
}
