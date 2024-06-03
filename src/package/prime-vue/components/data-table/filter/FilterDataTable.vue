<template>
  <DataTable
      ref="tableRef"
      class="p-datatable-sm"
      responsiveLayout="scroll"
      :scrollable="true"
      scrollHeight="flex"
      scrollDirection="both"
      :resizableColumns="true"
      columnResizeMode="expand"
      :value="tableContext.data"
      v-model:filters="tableContext.filters"
      filterDisplay="row"
      stripedRows
      showGridlines
  >
    <template #empty>
      没有数据.
    </template>
    <slot/>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import {PsrPrmFilterDataTableContext} from "./PsrPrmFilterDataTableContext";

defineProps<{
  tableContext: PsrPrmFilterDataTableContext<any>
}>()
</script>

<style>
.p-datatable-scrollable .p-datatable-thead {
  z-index: 2 !important;
}
</style>