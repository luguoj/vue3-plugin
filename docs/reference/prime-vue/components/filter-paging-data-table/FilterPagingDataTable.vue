<script setup lang="ts">
import PvColumn from 'primevue/column';
import PvInput from "primevue/inputtext"
import {PsrPrmFilterPagingDataTable, PsrPrmFilterPagingDataTableContext} from "@psr-framework/vue3-plugin";
import {FilterMatchMode} from "@primevue/core/api";

interface DataItem {
  id: string,
  code: string
}

const data: DataItem[] = []
for (let i = 0; i < 1000; i++) {
  data.push({
    id: `id-${i}`,
    code: `code-${i}`
  })
}

const tableContext = PsrPrmFilterPagingDataTableContext.create<DataItem>({
  // 加载数据处理器
  loadDataHandler: (filter, pageable) => {
    const id = filter.id?.[0]?.from as string
    const code = filter.code?.[0]?.from as string
    return Promise.resolve({
      totalPages: 10,
      totalElements: 1000,
      content: data.filter(item => {
        if (id && !item.id.includes(id.substring(1, id.length - 1))) {
          return false
        }
        if (code && !item.code.includes(code.substring(1, code.length - 1))) {
          return false
        }
        return true
      }).slice(pageable.offset, (pageable.offset || 0) + (pageable.limit || 1000))
    })
  },
  // 过滤器默认值
  defaultFilters: () => {
    return {
      'id': {value: undefined, matchMode: FilterMatchMode.CONTAINS},
      'code': {value: undefined, matchMode: FilterMatchMode.CONTAINS}
    }
  }
})
tableContext.load()
</script>

<template>
  <div style="height:500px;">
    <psr-prm-filter-paging-data-table :table-context="tableContext" @filter="tableContext.load()">
      <pv-column field="id" header="ID" :show-filter-menu="false">
        <template #filter="{filterModel,filterCallback}">
          <pv-input class="p-column-filter" v-model="filterModel.value" @change="filterCallback()" type="text"/>
        </template>
      </pv-column>
      <pv-column field="code" header="CODE" :show-filter-menu="false">
        <template #filter="{filterModel,filterCallback}">
          <pv-input v-model="filterModel.value" @change="filterCallback()"/>
        </template>
      </pv-column>
    </psr-prm-filter-paging-data-table>
  </div>
</template>