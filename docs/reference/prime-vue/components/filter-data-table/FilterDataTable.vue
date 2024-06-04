<script setup lang="ts">
import PvColumn from 'primevue/column';
import PvInput from "primevue/inputtext"
import {PsrPrmFilterDataTable, PsrPrmFilterDataTableContext} from "@psr-framework/vue3-plugin";

interface DataItem {
  id: string,
  code: string
}

const tableContext1 = PsrPrmFilterDataTableContext.create<DataItem>({
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
  defaultFilters: () => {
    return {
      'id': '',
      'code': ''
    }
  }
})
tableContext1.load()
</script>

<template>
  <div class="vp-raw" style="height:500px;">
    <psr-prm-filter-data-table :table-context="tableContext1">
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

<style scoped>
</style>