import {type PiniaPluginContext, type StateTree} from 'pinia'
import {DebounceStorage as _DebounceStorage} from "../services/DebounceStorage";

export namespace PsrPiniaPersistTypes {
    export interface Storage {
        getItem: (key: string) => string | null | Promise<string | null>
        setItem: (key: string, value: string) => void
    }

    export abstract class DebounceStorage extends _DebounceStorage {
    }

    export interface Serializer {
        serialize: (value: StateTree) => string
        deserialize: (value: string) => StateTree
    }

    export interface Options {
        key?: string
        storage?: Storage
        paths?: Array<string>
        serializer?: Serializer
        beforeRestore?: (context: PiniaPluginContext) => void
        afterRestore?: (context: PiniaPluginContext) => void
        debug?: boolean
    }

    export type FactoryOptions = Pick<
        Options,
        'storage' | 'serializer' | 'afterRestore' | 'beforeRestore' | 'debug'
    > & {
        key?: (storeKey: string) => string
    }
}