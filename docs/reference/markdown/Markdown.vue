<script setup lang="ts">
import {ref} from "vue";
import {ElInput} from "element-plus";
import {PsrMarkdown} from "@psr-framework/vue3-plugin"
import {markdownContent} from "./markdown-content";

const input = ref(markdownContent)
</script>

<template>
  <div style="height: 500px;">
    <el-input class="input" v-model="input" type="textarea" autosize
              style="width: 50%;height:100%;display: inline-block;" resize="none"/>
    <psr-markdown :markdown-content="input" style="width: 50%;height:100%;display: inline-block;overflow: scroll;"/>
  </div>
</template>

<style scoped lang="scss">
.input :deep(.el-textarea__inner) {
  height: 100% !important;
}
</style>
