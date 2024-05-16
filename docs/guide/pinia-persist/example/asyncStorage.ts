import {createDebounceStorage, PsrPiniaPersistTypes} from "@psr-framework/vue3-plugin";

export const storage: PsrPiniaPersistTypes.Storage = {
    getItem: (key) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(localStorage.getItem(key))
            }, 1000)
        })
    },
    setItem: (key, value) => {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                console.log('saved')
                localStorage.setItem(key, value || '')
                resolve()
            }, 1000)
        })
    }
}

export const asyncStorage = createDebounceStorage(
    1000,
    storage
)