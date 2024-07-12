<script setup lang="ts">
import {shallowRef} from "vue";
import {PsrElAsyncActionButton, PsrMarkdown, PsrPrinter} from "@psr-framework/vue3-plugin";
import {markdownContent} from "../../markdown/markdown-content.ts";

const pageRef = shallowRef<HTMLElement>()

function handlePrint() {
  return pageRef.value && PsrPrinter.print(
      pageRef.value
  )
}

function handlePreview() {
  return pageRef.value && PsrPrinter.preview(
      pageRef.value
  )
}
</script>

<template>
  <div style="height: 500px;display: flex;flex-direction: column;">
    <div style="padding:1em;">
      <psr-el-async-action-button :button-action="handlePrint">打印</psr-el-async-action-button>
      <psr-el-async-action-button :button-action="handlePreview">预览</psr-el-async-action-button>
    </div>
    <div style="overflow: scroll;border: 1px solid var(--el-border-color);">
      <div ref="pageRef">
        <psr-markdown :markdown-content="markdownContent"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>