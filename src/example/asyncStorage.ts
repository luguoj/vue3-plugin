import {createDebounceStorage} from "../package";

export const asyncStorage = createDebounceStorage(
    1000,
    (key) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(localStorage.getItem(key))
            }, 5000)
        })
    },
    (key, value) => {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                console.log('saved')
                localStorage.setItem(key, value || '')
                resolve()
            }, 1000)
        })
    }
)