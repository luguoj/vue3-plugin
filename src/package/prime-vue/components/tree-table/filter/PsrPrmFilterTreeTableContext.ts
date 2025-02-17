import {reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";

interface TreeNode<E> {
    key: string,
    data: E,
    children?: TreeNode<E>[]
}


function extractData<E>(
    datas: E[],
    childrenProperty: keyof E,
    keyProperty: keyof E,
    recordByKey?: { [key: string]: E }
) {
    recordByKey = recordByKey || {}
    const rootNodes: TreeNode<E>[] = []
    for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        const key = data[keyProperty] as unknown as string
        let children: TreeNode<E>[] = []
        if (data[childrenProperty]) {
            children = extractData(data[childrenProperty] as unknown as E[], childrenProperty, keyProperty, recordByKey).rootNodes
        }
        rootNodes.push({
            key,
            data,
            children,
        })
        recordByKey[key] = data

    }
    return {rootNodes, recordByKey}
}

type FilterType<E> = Partial<Record<keyof E, any>> & { global?: any }

export class PsrPrmFilterTreeTableContext<E> {
    loadDataHandler: () => Promise<E[] | undefined>
    defaultFilters: () => FilterType<E>
    filters: { [p: string]: string } = {}
    childrenProperty: keyof E
    keyProperty: keyof E

    rootNodes: TreeNode<E>[] = []
    records: E[] = []
    recordByKey: { [key: string]: E } = {}
    loading: boolean = false

    constructor(
        loadDataHandler: () => Promise<E[] | undefined>,
        defaultFilters: () => FilterType<E>,
        childrenProperty: keyof E = 'children' as unknown as keyof E,
        keyProperty: keyof E = 'id' as unknown as keyof E
    ) {
        this.loadDataHandler = loadDataHandler
        this.defaultFilters = defaultFilters
        this.clearFilters()
        this.childrenProperty = childrenProperty
        this.keyProperty = keyProperty
    }

    static create<E>(
        options: {
            loadDataHandler: () => Promise<E[] | undefined>,
            defaultFilters: () => FilterType<E>,
            childrenProperty?: keyof E
            keyProperty?: keyof E
        }
    ): UnwrapNestedRefs<PsrPrmFilterTreeTableContext<E>> {
        return reactive(new PsrPrmFilterTreeTableContext(
            options.loadDataHandler,
            options.defaultFilters,
            options.childrenProperty,
            options.keyProperty
        ))
    }

    load() {
        this.loading = true
        return this.loadDataHandler().then(data => {
            const {rootNodes, recordByKey} = data
                ? extractData(data, this.childrenProperty, this.keyProperty)
                : {rootNodes: [], recordByKey: {}}
            this.rootNodes = rootNodes
            this.recordByKey = recordByKey
            this.records = data || []
        }).finally(() => this.loading = false)
    }

    clearFilters() {
        this.filters = this.defaultFilters()
    }
}