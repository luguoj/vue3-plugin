<script setup lang="ts">
import {PsrFileViewer} from "@psr-framework/vue3-plugin";
import {ref} from "vue";
import { withBase } from 'vitepress'

type FileItem = {
  src: string
  contentType: string
}

const files = [
  {
    src: '/file-viewer-resources/test.pdf',
    contentType: 'application/pdf'
  },
  {
    src: '/file-viewer-resources/test.docx',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    src: '/file-viewer-resources/test.xlsx',
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  },
  {
    src: '/file-viewer-resources/test.txt',
    contentType: 'text/plain'
  },
  {
    src: '/file-viewer-resources/test.jpg',
    contentType: 'image/jpeg'
  },
  {
    src: '/file-viewer-resources/test.mp4',
    contentType: 'video/mpeg'
  }
]

const fileRef = ref<FileItem | null>(null)

</script>

<template>
  <button @click="fileRef=files[0]">pdf</button>
  <button @click="fileRef=files[1]">docx</button>
  <button @click="fileRef=files[2]">excel</button>
  <button @click="fileRef=files[3]">text</button>
  <button @click="fileRef=files[4]">image</button>
  <button @click="fileRef=files[5]">video</button>
  <div style="height: 350px;">
    <psr-file-viewer v-if="fileRef" style="height: 100%;" :src="withBase(fileRef.src)" :content-type="fileRef.contentType"/>
  </div>
</template>
