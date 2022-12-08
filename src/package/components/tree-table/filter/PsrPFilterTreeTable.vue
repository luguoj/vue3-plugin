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

<style scoped>

</style>