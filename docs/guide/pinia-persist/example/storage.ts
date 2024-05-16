import {PsrPiniaPersistTypes} from "@psr-framework/vue3-plugin";

export const storage: PsrPiniaPersistTypes.Storage = {
    getItem: (key) => {
        return localStorage.getItem(key)
    },
    setItem: (key, value) => {
        localStorage.setItem(key, value || '')
    }
}