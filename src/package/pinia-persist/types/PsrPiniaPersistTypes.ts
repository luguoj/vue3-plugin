import {type PiniaPluginContext, type StateTree} from 'pinia'

export namespace PsrPiniaPersistTypes {
    export interface Storage {
        getItem: (key: string) => string | null | Promise<string | null>
        setItem: (key: string, value: string) => void | Promise<void>
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

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S extends StateTree, Store> {
        persist?: boolean | PsrPiniaPersistTypes.Options | PsrPiniaPersistTypes.Options[]
    }

    export interface PiniaCustomProperties {
        $restore: (opts?: { runHooks?: boolean }) => Promise<void>
        $persist: () => void
    }
}