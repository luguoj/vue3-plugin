<script setup lang="ts">
import {PsrElAsyncActionButton, PsrElReadFileButton} from "../package";
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
  <psr-el-async-action-button
      :icon="Search"
      :button-action="buttonAction"
  >Async Action
  </psr-el-async-action-button>
  <psr-el-read-file-button
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
  </psr-el-read-file-button>
</template>

<style scoped>
</style>
