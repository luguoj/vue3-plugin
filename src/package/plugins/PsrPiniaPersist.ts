import {PiniaPlugin, PiniaPluginContext, StateTree, Store, SubscriptionCallbackMutation} from "pinia";
import {PsrPiniaPersistTypes} from "../types/PsrPiniaPersistTypes";
import {normalizeOptions} from "../services/normalizeOptions";
import {pickStateTree} from "../services/pickStateTree";
import {PromiseQueue} from "@psr-framework/typescript-utils"

export function createPsrPiniaPersist(
    factoryOptions: PsrPiniaPersistTypes.FactoryOptions = {},
): PiniaPlugin {
    return (context: PiniaPluginContext) => {
        const {
            options: {persist},
            store,
        } = context

        if (!persist)
            return
        const restoreQueue = new PromiseQueue.Queue()
        const persistOptionsArr = (
            Array.isArray(persist)
                ? persist.map(p => normalizeOptions(p, factoryOptions))
                : [normalizeOptions(persist, factoryOptions)]
        ).map(
            ({
                 storage = localStorage,
                 beforeRestore = () => {
                 },
                 afterRestore = () => {
                 },
                 serializer = {
                     serialize: JSON.stringify,
                     deserialize: JSON.parse,
                 },
                 key = store.$id,
                 paths,
                 debug = false,
             }) => ({
                storage,
                beforeRestore,
                afterRestore,
                serializer,
                key: (factoryOptions.key ?? (k => k))(key),
                paths,
                debug,
            }),
        )
        persistOptionsArr.forEach((persistence) => {
            const {beforeRestore, afterRestore} = persistence
            beforeRestore(context)
            restoreQueue.enqueue((resolve, reject) => {
                restore(store, persistence).then(resolve).catch(reject)
            }).finally(() => {
                afterRestore(context)

            })
            store.$subscribe(
                (
                    _mutation: SubscriptionCallbackMutation<StateTree>,
                    state: StateTree,
                ) => {
                    if (_mutation.type === 'direct' && !restoreQueue.flushing) {
                        persistState(state, persistence)
                    }
                }, {
                    detached: true,
                },
            )
        })

        store.$persist = () => {
            persistOptionsArr.forEach((persistence) => {
                if (!restoreQueue.flushing) {
                    persistState(store.$state, persistence)
                }
            })
        }

        store.$restore = ({runHooks = true} = {}) => {
            persistOptionsArr.forEach((persistence) => {
                const {beforeRestore, afterRestore} = persistence
                if (runHooks) {
                    beforeRestore(context)
                }
                restoreQueue.enqueue((resolve, reject) => {
                    restore(store, persistence).then(resolve).catch(reject)
                }).finally(() => {
                    if (runHooks) {
                        afterRestore(context)
                    }

                })

            })
        }
    }
}

interface Persistence {
    storage: PsrPiniaPersistTypes.Storage
    serializer: PsrPiniaPersistTypes.Serializer
    key: string
    paths?: string[]
    debug: boolean
}

function restore(
    store: Store,
    {storage, serializer, key, debug}: Persistence,
) {
    return new Promise((resolve, reject) => {
        try {
            const fromStorage = storage.getItem(key)
            if (fromStorage instanceof Promise) {
                fromStorage.then(value => {
                    doRestore(store, value, serializer)
                    resolve(true)
                })
            } else {
                doRestore(store, fromStorage, serializer)
                resolve(true)
            }
        } catch (error) {
            if (debug) {
                console.error(error)
            }
            reject(error)
        }
    })
}

function doRestore(
    store: Store,
    value: string | null,
    serializer: PsrPiniaPersistTypes.Serializer
) {
    if (value) {
        store.$patch(serializer.deserialize(value))
    } else {
        store.$reset()
    }
}

function persistState(
    state: StateTree,
    {storage, serializer, key, paths, debug}: Persistence,
) {
    try {
        const toStore = pickStateTree(state, paths)
        storage.setItem(key, serializer.serialize(toStore))
    } catch (error) {
        if (debug)
            console.error(error)
    }
}