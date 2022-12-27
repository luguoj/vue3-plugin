import {PsrPiniaPersistTypes} from "../types/PsrPiniaPersistTypes";
import {PromiseQueue} from "@psr-framework/typescript-utils";

export function createDebounceStore(
    delay: number,
    getItemFn: (key: string) => string | Promise<string | null> | null,
    setItemFn: (key: string, value: string) => void | Promise<void>
): PsrPiniaPersistTypes.Storage {
    const queue = new PromiseQueue.Queue()
    let debounceTimer: NodeJS.Timer | null = null
    return {
        getItem: getItemFn,
        setItem(key: string, value: string): void {
            if (debounceTimer) {
                clearTimeout(debounceTimer)
                debounceTimer = null
            }
            debounceTimer = setTimeout(() => {
                queue.enqueue<void>(resolve => {
                    const result = setItemFn(key, value)
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