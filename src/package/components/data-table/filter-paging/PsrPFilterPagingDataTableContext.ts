import {DataTableFilterMetaData} from "primevue/datatable";

import {reactive, watch} from "vue";
import {FilterOptions, PagingTypes} from "@psr-framework/typescript-utils"
import {buildFilterOptions} from "./buildFilterOptions";

export class PsrPFilterPagingDataTableContext<E> {
    loadDataHandler: (filter: Record<string, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>
    defaultFilters: () => Record<string, DataTableFilterMetaData>

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
    filters: Record<string, DataTableFilterMetaData>

    constructor(
        loadDataHandler: (filter: Record<string, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
        defaultFilters: () => Record<string, DataTableFilterMetaData>
    ) {
        this.loadDataHandler = loadDataHandler
        this.defaultFilters = defaultFilters
        this.filters = defaultFilters()
        watch(() => this.pageable.limit, () => this.load(0))
    }

    static create<E>(
        options: {
            loadDataHandler: (filter: Record<string, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
            defaultFilters: () => Record<string, DataTableFilterMetaData>
        }
    ) {
        return reactive(new PsrPFilterPagingDataTableContext(
            options.loadDataHandler,
            options.defaultFilters
        ))
    }

    load(page?: number) {
        if (page && this.pageable.limit) {
            this.pageable.offset = page * this.pageable.limit
        }
        this.loading = true
        const filterOptions = buildFilterOptions(this.filters)
        return this.loadDataHandler(filterOptions, this.pageable).then(data => {
            this.data = data
        }).finally(() => this.loading = false)
    }

    clearFilters() {
        this.filters = this.defaultFilters()
    }
}