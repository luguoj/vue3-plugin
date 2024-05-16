import {PsrPiniaPersistTypes} from "../types/PsrPiniaPersistTypes";
import {PromiseQueue} from "@psr-framework/typescript-utils";

export function createDebounceStorage(
    delay: number,
    {getItem, setItem}: PsrPiniaPersistTypes.Storage
): PsrPiniaPersistTypes.Storage {
    const queue = new PromiseQueue.Queue()
    let debounceTimer: NodeJS.Timeout | null = null
    return {
        getItem,
        setItem(key: string, value: string): void {
            if (debounceTimer) {
                clearTimeout(debounceTimer)
                debounceTimer = null
            }
            debounceTimer = setTimeout(() => {
                queue.enqueue<void>(resolve => {
                    const result = setItem(key, value)
                    if (result instanceof Promise) {
                        result.finally(() => {
                            resolve()
                        })
                    } else {
                        resolve()
                    }
                }).then()
            }, delay)
        }
    }
}