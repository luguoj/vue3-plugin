import "pinia"
import {StateTree} from "pinia";
import {PsrPiniaPersistTypes} from "../types/PsrPiniaPersistTypes";

export declare module 'pinia' {
    export interface DefineStoreOptionsBase<S extends StateTree, Store> {
        persist?: boolean | PsrPiniaPersistTypes.Options | PsrPiniaPersistTypes.Options[]
    }

    export interface PiniaCustomProperties {
        $restore: (opts?: { runHooks?: boolean }) => Promise<void>
        $persist: () => void
    }
}