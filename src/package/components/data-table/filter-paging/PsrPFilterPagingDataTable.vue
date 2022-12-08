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
      v-model:first="context.pageable.offset"
      :rows="context.pageable.limit"
      @page="onDataTableEvent"
      @sort="onDataTableEvent"
      :value="context.data.content"
      :totalRecords="context.data.totalElements"
      v-model:filters="context.filters"
      filterDisplay="row"
      stripedRows
      showGridlines
  >
    <template #empty>
      没有数据.
    </template>
    <template #paginatorstart>
      <Dropdown
          v-model="context.pageable.limit"
          :options="context.limitSelectOptions"
          optionLabel="limit"
          optionValue="limit"
          placeholder="Select a City"
      />
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
import Dropdown from "primevue/dropdown";
import {PsrPFilterPagingDataTableContext} from "./PsrPFilterPagingDataTableContext";

const props = defineProps<{
  context: PsrPFilterPagingDataTableContext<any>
}>()
const tableRef = ref<DataTable>()

function handleExport() {
  tableRef.value?.exportCSV();
}

function onDataTableEvent(event: any) {
  props.context.pageable.offset = event.first
  props.context.pageable.limit = event.rows
  if (event.sortField) {
    props.context.pageable.sort = event.sortField
    props.context.pageable.dir = event.sortOrder > 0 ? 'ASC' : 'DESC'
  } else {
    delete props.context.pageable.sort
    delete props.context.pageable.dir
  }
  props.context.load()
}

</script>

<style>
.p-datatable-scrollable .p-datatable-thead {
  z-index: 2 !important;
}
</style>