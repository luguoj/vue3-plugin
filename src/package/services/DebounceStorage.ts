import {PsrPiniaPersistTypes} from "../types/PsrPiniaPersistTypes";
import {PromiseQueue} from "@psr-framework/typescript-utils";

export abstract class DebounceStorage implements PsrPiniaPersistTypes.Storage {
    debounceTimer: number | undefined
    queue = new PromiseQueue.Queue()
    private readonly _delay: number

    protected constructor(delay: number) {
        this._delay = delay
    }

    setItem(key: string, value: string): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
        }
        this.debounceTimer = setTimeout(() => {
            this.queue.enqueue<void>(resolve => {
                const result = this._setItem(key, value)
                if (result instanceof Promise) {
                    result.finally(() => {
                        resolve()
                    })
                } else {
                    resolve()
                }
            })
        }, this._delay)
    }

    abstract getItem(key: string): string | Promise<string | null> | null ;

    protected abstract _setItem(key: string, value: string): void | Promise<void>
}