<script setup lang="ts">
import {PsrElAsyncActionButton} from "@psr-framework/vue3-plugin";
import {Search} from '@element-plus/icons-vue'

function buttonAction(result: any) {
  console.log(result)
  return new Promise(resolve => setTimeout(resolve, 3000))
}
</script>

<template>
  <psr-el-async-action-button
      :icon="Search"
      :button-action="buttonAction"
  >Async Action
  </psr-el-async-action-button>
</template>
