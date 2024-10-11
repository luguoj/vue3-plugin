<script setup lang="ts">
import {ref, watch} from "vue";
import {vLoading} from "element-plus"
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from "@vue-office/docx";
import VueOfficeExcel from "@vue-office/excel";
import '@vue-office/docx/lib/index.css'
import '@vue-office/excel/lib/index.css'

const props = defineProps<{
  src: string
  contentType: string
}>()

const loading = ref(false)
watch([() => props.src, () => props.contentType], ([src, contentType]) => {
  if (
      contentType
      && (
          contentType === 'application/pdf'
          || contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          || contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          || contentType.startsWith('text')
          || contentType.startsWith('image')
          || contentType.startsWith('video')
      )
      && src
  ) {
    loading.value = true
  }
}, {immediate: true})

function handleLoad(){
  console.log('loaded')
  loading.value = false
}
</script>

<template>
  <div v-loading="loading">
    <vue-office-pdf
        v-if="contentType === 'application/pdf'"
        style="height: 100%;"
        :src="src"
        @rendered="handleLoad"
    />
    <vue-office-docx
        v-else-if="contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'"
        style="height: 100%;"
        :src="src"
        @rendered="handleLoad"
    />
    <vue-office-excel
        v-else-if="contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
        style="height: 100%;"
        :src="src"
        @rendered="handleLoad"
    />
    <iframe
        v-else-if="contentType.startsWith('text')"
        frameborder="0"
        style="height: 100%;"
        :src="src"
        @load="handleLoad"
    />
    <img
        v-else-if="contentType.startsWith('image')"
        style="height: 100%;object-fit: contain;"
        :src="src"
        @load="handleLoad"
    />
    <video
        v-else-if="contentType.startsWith('video')"
        controls
        style="height: 100%;object-fit: contain;"
        :src="src"
        @loadeddata="handleLoad"
    />
  </div>
</template>

<style scoped>

</style>