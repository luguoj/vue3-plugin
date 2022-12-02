import {PsrPiniaPersistTypes} from '../types/PsrPiniaPersistTypes'

function isObject(v: unknown) {
    return typeof v === 'object' && v !== null
}

export function normalizeOptions(
    options: boolean | PsrPiniaPersistTypes.Options | undefined,
    factoryOptions: PsrPiniaPersistTypes.FactoryOptions,
): PsrPiniaPersistTypes.Options {
    options = isObject(options) ? options : Object.create(null)
    return new Proxy(options as object, {
        get(target, key, receiver) {
            if (key === 'key')
                return Reflect.get(target, key, receiver)
            return (
                Reflect.get(target, key, receiver)
                || Reflect.get(factoryOptions, key, receiver)
            )
        },
    })
}
