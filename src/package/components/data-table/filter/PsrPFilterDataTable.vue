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
      :value="context.data"
      v-model:filters="context.filters"
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
import {PsrPFilterDataTableContext} from "./PsrPFilterDataTableContext";

const props = defineProps<{
  context: PsrPFilterDataTableContext<any>
}>()
</script>

<style scoped>

</style>