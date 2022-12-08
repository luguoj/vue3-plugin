<template>
  <TreeTable
      class="p-treetable-sm"
      :scrollable="true"
      scrollHeight="flex"
      scrollDirection="both"
      :resizableColumns="true"
      columnResizeMode="expand"
      :filters="context.filters"
      filterMode="lenient"
      :value="context.rootNodes"
  >
    <slot/>
  </TreeTable>
</template>

<script setup lang="ts">
import TreeTable from "primevue/treetable";
import {PsrPFilterTreeTableContext} from "./PsrPFilterTreeTableContext";

const props = defineProps<{
  context: PsrPFilterTreeTableContext<any>
}>()
</script>

<style>
.p-treetable.p-treetable-sm .p-treetable-header {
  padding: 0.5rem;
}

.p-treetable-scrollable .p-treetable-thead {
  z-index: 2 !important;
}
</style>