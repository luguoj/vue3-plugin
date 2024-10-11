<script setup lang="ts">
import {PsrFileViewer} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

type FileItem = {
  src: string
  contentType: string
}

const files = [
  {
    src: './test.pdf',
    contentType: 'application/pdf'
  },
  {
    src: './test.docx',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  {
    src: './test.xlsx',
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  },
  {
    src: './test.txt',
    contentType: 'text/plain'
  },
  {
    src: './test.jpg',
    contentType: 'image/jpeg'
  },
  {
    src: './test.mp4',
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
    <psr-file-viewer v-if="fileRef" style="height: 100%;" :src="fileRef.src" :content-type="fileRef.contentType"/>
  </div>
</template>
