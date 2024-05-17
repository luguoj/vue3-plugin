<script setup lang="ts">
import {PsrElReadFileButton} from "@psr-framework/vue3-plugin";
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";

const text = ref<string>("")
const progress = ref<string>("0/0")

function buttonAction(result: string | ArrayBuffer | null) {
  text.value = result as string // 获取文件内容
  return new Promise(resolve => setTimeout(resolve, 3000)) // 支持异步处理(上传文件)
}

function buttonReadProgress(loaded: number, total: number) {
  progress.value = `${loaded}/${total}` // 跟踪读取进度
}
</script>


<template>
  <psr-el-read-file-button
      :button-action="buttonAction"
      @button-read-progress="buttonReadProgress"
      type="danger"
      :icon="Search"
  >
    Read File
  </psr-el-read-file-button>
  <div>{{ progress }}</div>
  <div style="max-height: 300px;overflow: auto;">{{ text }}</div>
</template>
