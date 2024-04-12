<script setup lang="ts">
import Button from 'primevue/button';
import PvColumn from 'primevue/column';
import PvInput from "primevue/inputtext"
import FilterDataTable from "../package/components/data-table/filter/FilterDataTable.vue";
import {PsrPrmFilterDataTableContext} from "../package";

let theme = true;

function handler() {
  document.getElementsByTagName('html')[0].className = theme ? 'dark' : ''
  theme = !theme
}

interface DataItem {
  id: string,
  code: string
}

const tableContext1 = PsrPrmFilterDataTableContext.create<DataItem>({
  loadDataHandler: () => {
    return Promise.resolve([{id: 'id', code: 'code'}])
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
  <div>
    <Button @click="handler">abc</Button>
    <Button @click="handler">主题</Button>
  </div>
  <filter-data-table :table-context="tableContext1">
    <pv-column field="id" header="ID" filterMatchMode="equals">
      <template #filter="{filterModel,filterCallback}">
        <pv-input v-model="filterModel.value" @change="filterCallback()"/>
      </template>
    </pv-column>
    <pv-column field="code" header="CODE" filterMatchMode="equals">
      <template #filter="{filterModel,filterCallback}">
        <pv-input v-model="filterModel.value" @change="filterCallback()"/>
      </template>
    </pv-column>
  </filter-data-table>
</template>

<style scoped>
</style>
