<template>
  <el-upload
      ref="uploadRef"
      :disabled="synchronizing"
      :auto-upload="false"
      style="height: fit-content;width: fit-content;"
      :on-change="onChange"
      :show-file-list="false"
      :accept="buttonAccept"
  >
    <template #trigger>
      <slot v-if="buttonCustom" :synchronizing="{synchronizing}"/>
      <el-button v-else :loading="synchronizing" v-bind="$attrs">
        <template #icon v-if="$slots.icon">
          <slot name="icon"/>
        </template>
        <slot/>
      </el-button>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ElButton, ElUpload, UploadFile, UploadInstance} from "element-plus";
import "element-plus/es/components/upload/style/css"
import 'element-plus/es/components/button/style/css'
import {ReadState, useFileReader} from "./useFileReader";

const props = withDefaults(defineProps<{
  buttonCustom?: boolean,
  buttonAccept?: string,
  buttonContentType?: 'text' | 'ArrayBuffer',
  buttonAction: (result: string | ArrayBuffer | null, params?: any) => Promise<any> | any
  buttonActionParams?: any
}>(), {
  buttonCustom: false,
  buttonAccept: '.txt',
  buttonContentType: 'text'
})

const emits = defineEmits<{
  (e: 'buttonReadStart'): void,
  (e: 'buttonReadProgress', loaded: number, total: number): void,
  (e: 'buttonReadEnd', readState: ReadState, error?: DOMException): void
}>()
const uploadRef = ref<UploadInstance>()
const synchronizing = ref(false)
const {readAsText, readAsArrayBuffer} = useFileReader({
  load: (result) => {
    if (typeof props.buttonAction === 'function') {
      const actionResult = props.buttonAction(result, props.buttonActionParams)
      if (actionResult instanceof Promise) {
        actionResult.finally(() => {
          synchronizing.value = false
        })
      } else {
        synchronizing.value = false
      }
    } else {
      synchronizing.value = false
    }
  },
  loadStart: () => {
    synchronizing.value = true
    emits('buttonReadStart')
  },
  loadEnd: (readState, error) => {
    if (error) {
      synchronizing.value = false
    }
    emits('buttonReadEnd', readState, error)
  },
  progress: (loaded, total) => {
    emits('buttonReadProgress', loaded, total)
  }
})

function onChange(uploadFile: UploadFile) {
  if (synchronizing.value === false && uploadFile.raw) {
    if (props.buttonContentType === 'text') {
      readAsText(uploadFile.raw);
    } else if (props.buttonContentType === 'ArrayBuffer') {
      readAsArrayBuffer(uploadFile.raw)
    }
    uploadRef.value?.clearFiles()
  }
}
</script>

<style lang="scss" scoped>

</style>