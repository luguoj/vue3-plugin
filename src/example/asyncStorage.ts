import {PsrPiniaPersistTypes} from "../package";

export class AsyncStorage extends PsrPiniaPersistTypes.DebounceStorage {
    constructor() {
        super(1000);
    }

    getItem(key: string): Promise<string | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(localStorage.getItem(key))
            }, 5000)
        })
    }

    _setItem(key: string, value: string) {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                console.log('saved')
                localStorage.setItem(key, value)
                resolve()
            }, 1000)
        })
    }
}