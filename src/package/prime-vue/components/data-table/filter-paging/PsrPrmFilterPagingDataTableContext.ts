import {DataTableFilterMetaData} from "primevue/datatable";

import {reactive, watch} from "vue";
import {FilterOptions, PagingTypes} from "@psr-framework/typescript-utils"
import {buildFilterOptions} from "./buildFilterOptions";
import {UnwrapNestedRefs} from "@vue/reactivity";

type FilterType<E> = Record<keyof E, DataTableFilterMetaData>

export class PsrPrmFilterPagingDataTableContext<E> {
    loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>
    defaultFilters: () => FilterType<E>

    pageable: PagingTypes.Pageable = {
        offset: 0,
        limit: 20,
    }
    limitSelectOptions: number[] = [10, 20, 50, 100]
    data: PagingTypes.Page<E> = {
        content: [],
        totalElements: 0,
        totalPages: 0
    }
    loading: boolean = false
    filters: FilterType<E>

    constructor(
        loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
        defaultFilters: () => FilterType<E>
    ) {
        this.loadDataHandler = loadDataHandler
        this.defaultFilters = defaultFilters
        this.filters = defaultFilters()
        watch(() => this.pageable.limit, () => this.load(0))
    }

    static create<E>(
        options: {
            loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
            defaultFilters: () => FilterType<E>
        }
    ): UnwrapNestedRefs<PsrPrmFilterPagingDataTableContext<E>> {
        return reactive(new PsrPrmFilterPagingDataTableContext(
            options.loadDataHandler,
            options.defaultFilters
        ))
    }

    load(page?: number) {
        if (page && this.pageable.limit) {
            this.pageable.offset = page * this.pageable.limit
        }
        this.loading = true
        const filterOptions = buildFilterOptions<E>(this.filters)
        return this.loadDataHandler(filterOptions, this.pageable).then(data => {
            this.data = data
        }).finally(() => this.loading = false)
    }

    clearFilters() {
        this.filters = this.defaultFilters()
    }
}