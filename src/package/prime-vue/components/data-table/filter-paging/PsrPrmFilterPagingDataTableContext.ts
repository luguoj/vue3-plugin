import {reactive, watch} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {DataTableFilterMeta, DataTableFilterMetaData} from "primevue/datatable";
import {FilterOptions, PagingTypes} from "@psr-framework/typescript-utils"
import {buildFilterOptions, FilterType} from "./buildFilterOptions";

type FilterType2<E> = Partial<Record<keyof E, DataTableFilterMetaData>>

export class PsrPrmFilterPagingDataTableContext<E> {
    loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>
    defaultFilters: () => FilterType2<E>

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
    filters: FilterType = {}

    constructor(
        loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
        defaultFilters: () => FilterType2<E>
    ) {
        this.loadDataHandler = loadDataHandler
        this.defaultFilters = defaultFilters
        this.clearFilters()
        watch(() => this.pageable.limit, () => this.load(0))
    }

    static create<E>(
        options: {
            loadDataHandler: (filter: Record<keyof E, FilterOptions.ValueRange[]>, pageable: PagingTypes.Pageable) => Promise<PagingTypes.Page<E>>,
            defaultFilters: () => FilterType2<E>
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
        const defaultFilters = this.defaultFilters()
        const newFilters: Record<string, DataTableFilterMetaData> = {}
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