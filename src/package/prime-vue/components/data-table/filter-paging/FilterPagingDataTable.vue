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
      :paginator="true"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate="{first} - {last} / {totalRecords}"
      :lazy="true"
      v-model:first="tableContext.pageable.offset"
      v-model:rows="tableContext.pageable.limit"
      :rows-per-page-options="tableContext.limitSelectOptions"
      @page="onDataTableEvent"
      @sort="onDataTableEvent"
      :value="tableContext.data.content"
      :totalRecords="tableContext.data.totalElements"
      v-model:filters="tableContext.filters"
      filterDisplay="row"
      stripedRows
      showGridlines
  >
    <template #empty>
      没有数据.
    </template>
    <template #paginatorstart>
      <slot name="paginatorstart"/>
    </template>
    <template #paginatorend>
      <slot name="paginatorend"/>
    </template>
    <slot/>
  </DataTable>
</template>

<script setup lang="ts">
import {ref} from "vue";
import DataTable from "primevue/datatable";
import {PsrPrmFilterPagingDataTableContext} from "./PsrPrmFilterPagingDataTableContext";

const props = defineProps<{
  tableContext: PsrPrmFilterPagingDataTableContext<any>
}>()
const tableRef = ref<typeof DataTable>()

// function handleExport() {
//   tableRef.value?.exportCSV();
// }

function onDataTableEvent(event: any) {
  props.tableContext.pageable.offset = event.first
  props.tableContext.pageable.limit = event.rows
  if (event.sortField) {
    props.tableContext.pageable.sort = event.sortField
    props.tableContext.pageable.dir = event.sortOrder > 0 ? 'ASC' : 'DESC'
  } else {
    delete props.tableContext.pageable.sort
    delete props.tableContext.pageable.dir
  }
  props.tableContext.load()
}

</script>