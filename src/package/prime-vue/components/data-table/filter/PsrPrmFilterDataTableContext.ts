import {DataTableFilterMeta, DataTableFilterMetaData} from "primevue/datatable";
import {reactive} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";

type FilterType<E> = Partial<Record<keyof E, DataTableFilterMetaData>>

export class PsrPrmFilterDataTableContext<E> {
    loadDataHandler: () => Promise<E[]>
    defaultFilters: () => FilterType<E>

    data: E[] = []
    loading: boolean = false
    filters: DataTableFilterMeta = {}

    constructor(
        loadDataHandler: () => Promise<E[]>,
        defaultFilters: () => FilterType<E>
    ) {
        this.loadDataHandler = loadDataHandler
        this.defaultFilters = defaultFilters
        this.clearFilters()
    }

    static create<E>(
        options: {
            loadDataHandler: () => Promise<E[]>,
            defaultFilters: () => FilterType<E>
        }
    ): UnwrapNestedRefs<PsrPrmFilterDataTableContext<E>> {
        return reactive(new PsrPrmFilterDataTableContext(
            options.loadDataHandler,
            options.defaultFilters
        ))
    }

    load() {
        this.loading = true
        return this.loadDataHandler().then(data => {
            this.data = data
        }).finally(() => this.loading = false)
    }

    clearFilters() {
        const defaultFilters = this.defaultFilters()
        const newFilters: DataTableFilterMeta = {}
        for (const defaultFiltersKey in defaultFilters) {
            const filterItem = defaultFilters[defaultFiltersKey]
            if (filterItem == undefined) {
                continue
            }
            newFilters[defaultFiltersKey] = filterItem
        }
        this.filters = newFilters
    }
}