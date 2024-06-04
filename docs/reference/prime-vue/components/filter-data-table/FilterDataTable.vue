<script setup lang="ts">
import PvColumn from 'primevue/column';
import PvInput from "primevue/inputtext"
import {PsrPrmFilterDataTable, PsrPrmFilterDataTableContext} from "@psr-framework/vue3-plugin";

interface DataItem {
  id: string,
  code: string
}

const tableContext = PsrPrmFilterDataTableContext.create<DataItem>({
  // 加载数据处理器
  loadDataHandler: () => {
    const data: DataItem[] = []
    for (let i = 0; i < 1000; i++) {
      data.push({
        id: `id-${i}`,
        code: `code-${i}`
      })
    }
    return Promise.resolve(data)
  },
  // 过滤器默认值
  defaultFilters: () => {
    return {
      'id': '',
      'code': ''
    }
  }
})
tableContext.load()
</script>

<template>
  <div style="height:500px;">
    <psr-prm-filter-data-table :table-context="tableContext">
      <pv-column field="id" header="ID" filterMatchMode="equals">
        <template #filter="{filterModel,filterCallback}">
          <pv-input v-model="filterModel.value" @change="filterCallback()" type="text"/>
        </template>
      </pv-column>
      <pv-column field="code" header="CODE" filterMatchMode="equals">
        <template #filter="{filterModel,filterCallback}">
          <pv-input v-model="filterModel.value" @change="filterCallback()"/>
        </template>
      </pv-column>
    </psr-prm-filter-data-table>
  </div>
</template>