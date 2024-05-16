import type {StateTree} from 'pinia'

function get(state: StateTree, path: Array<string>): unknown {
    return path.reduce((obj, p) => {
        return obj?.[p]
    }, state)
}

function set(state: StateTree, path: Array<string>, val: unknown): StateTree {
    path.slice(0, -1).reduce((obj, p) => {
        if (/^(__proto__)$/.test(p))
            return {}
        else return (obj[p] = obj[p] || {})
    }, state)[path[path.length - 1]] = val
    return state

}

export function pickStateTree(baseState: StateTree, paths: string[] | undefined): StateTree {
    return Array.isArray(paths)
        ? paths.reduce<StateTree>((substate, path) => {
            const pathArray = path.split('.')
            return set(substate, pathArray, get(baseState, pathArray))
        }, {})
        : baseState
}
