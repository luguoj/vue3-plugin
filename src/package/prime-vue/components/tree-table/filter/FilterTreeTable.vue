<template>
  <TreeTable
      :scrollable="true"
      scrollHeight="flex"
      scrollDirection="both"
      :resizableColumns="true"
      columnResizeMode="expand"
      :filters="tableContext.filters"
      filterMode="lenient"
      :value="tableContext.rootNodes"
  >
    <slot/>
  </TreeTable>
</template>

<script setup lang="ts">
import TreeTable from "primevue/treetable";
import {PsrPrmFilterTreeTableContext} from "./PsrPrmFilterTreeTableContext";

defineProps<{
  tableContext: PsrPrmFilterTreeTableContext<any>
}>()
</script>