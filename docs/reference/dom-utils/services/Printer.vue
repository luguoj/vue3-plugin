<script setup lang="ts">
import {shallowRef} from "vue";
import {PsrElAsyncActionButton, PsrMarkdown, PsrPrinter} from "@psr-framework/vue3-plugin";
import {markdownContent} from "../../markdown/markdown-content.ts";

const pageRef = shallowRef<HTMLElement>()

const options = {
  // 文档标准，默认值 html5
  standard: 'html5',
  // 打印标题，默认值 undefined
  printTitle: '打印标题',
  // 打开打印对话框前回调
  beforePrintDialogOpen: () => {
    console.log('beforePrintDialogOpen')
  },
  // 打开打印对话框时回调
  onPrintDialogOpen: () => {
    console.log('onPrintDialogOpen')
  },
  // 关闭打印对话框时回调
  onPrintDialogClosed: () => {
    console.log('onPrintDialogClosed')
  }
}

const previewOptions = {
  // 打开预览前回调
  beforePreviewOpen: () => {
    console.log('beforePreviewOpen')
  },
  // 打开预览时回调
  onPreviewOpen: () => {
    console.log('onPreviewOpen')
  },
  // 关闭预览时回调
  onPreviewClosed: () => {
    console.log('onPreviewClosed')
  },
  // 预览窗口的z-index，默认值 20002
  previewZIndex: 20002,
  // 预览窗口的标题，默认值 "打印预览"
  previewTitle: "预览窗口的标题",
  // 预览窗口打印按钮的标题，默认值 "打印"
  previewPrintBtnLabel: "打印"
}

function handlePrint() {
  return pageRef.value && PsrPrinter.print(
      pageRef.value,
      options
  )
}

function handlePreview() {
  return pageRef.value && PsrPrinter.preview(
      pageRef.value,
      {
        ...options,
        ...previewOptions
      }
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