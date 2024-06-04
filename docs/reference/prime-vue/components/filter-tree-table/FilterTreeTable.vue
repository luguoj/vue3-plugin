<script setup lang="ts">
import PvColumn from 'primevue/column';
import PvInput from "primevue/inputtext"
import {PsrPrmFilterTreeTable, PsrPrmFilterTreeTableContext} from "@psr-framework/vue3-plugin";

interface DataItem {
  id: string,
  code: string,
  children?: DataItem[]
}

const tableContext = PsrPrmFilterTreeTableContext.create<DataItem>({
  // 加载数据处理器
  loadDataHandler: () => {
    const data: DataItem[] = []
    for (let i = 0; i < 1000; i++) {
      data.push({
        id: `id-${i}`,
        code: `code-${i}`,
        children: [
          {
            id: `id-${i}-1`,
            code: `code-${i}-1`
          }
        ]
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
    <psr-prm-filter-tree-table style="height: 100%;" :table-context="tableContext" show-gridlines>
      <pv-column style="width: 300px;" field="id" header="ID" filterMatchMode="contains" expander>
        <template #filter>
          <pv-input v-model="tableContext.filters['id']"/>
        </template>
      </pv-column>
      <pv-column style="width: 600px;" field="code" header="CODE" filterMatchMode="contains">
        <template #filter>
          <pv-input v-model="tableContext.filters['code']"/>
        </template>
      </pv-column>
    </psr-prm-filter-tree-table>
  </div>
</template>