<script setup lang="ts">
import {PsrAsyncActionButton, PsrReadFileButton} from "../package";
import {Search} from '@element-plus/icons-vue'
import {ElIcon} from "element-plus";
import "element-plus/es/components/icon/style/css"

function buttonAction(result: any) {
  console.log(result)
  return new Promise(resolve => setTimeout(resolve, 3000))
}

function buttonReadProgress(loaded: number, total: number) {
  console.log(`progress:${loaded}/${total}`)
}
</script>


<template>
  <psr-async-action-button
      :icon="Search"
      :button-action="buttonAction"
  >Async Action
  </psr-async-action-button>
  <psr-read-file-button
      :button-action="buttonAction"
      @button-read-progress="buttonReadProgress"
      type="danger"
  >
    <template #icon>
      <el-icon>
        <Search/>
      </el-icon>
    </template>
    Read File
  </psr-read-file-button>
</template>

<style scoped>
</style>
