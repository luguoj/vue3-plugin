<template>
  <el-dialog
      :title="creating?'创建':'编辑'"
      :before-close="beforeClose"
      :model-value="dialogContext.visible">
    <el-form :model="formData" label-width="auto">
      <slot :formData="formData" :creating="creating"/>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <psr-el-async-action-button
            type="primary"
            :disabled="!formDirty"
            :button-action="handleSubmit"
        >保存</psr-el-async-action-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, ref, toRaw, watch} from "vue";
import {ElDialog, ElForm, ElMessage, ElMessageBox} from "element-plus";
import "element-plus/es/components/dialog/style/css"
import "element-plus/es/components/form/style/css"
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"
import {PsrElAsyncActionButton} from "../../button/async-action";
import {isEqual} from "lodash";
import {PsrCreateUpdateFormDialogContext} from "./PsrCreateUpdateFormDialogContext";

const props = defineProps<{
  dialogContext: PsrCreateUpdateFormDialogContext<any>
}>()

const emits = defineEmits<{
  (e: 'dialogDataChanged', data: any): void
}>()

const originalData = ref<any>({})
const formData = ref<any>({})
const creating = computed(() => !originalData.value[props.dialogContext.idProperty])
const formDirty = computed(() => {
  return !isEqual(formData.value, originalData.value)
})

watch(() => props.dialogContext.data, data => {
  const dataRaw = toRaw(data)
  for (const dataRawKey in dataRaw) {
    originalData.value[dataRawKey] = dataRaw[dataRawKey]
    formData.value[dataRawKey] = dataRaw[dataRawKey]
  }
}, {immediate: true})

function hide() {
  props.dialogContext.visible = false
  props.dialogContext.data = props.dialogContext.defaultData()
}

function handleChanged(data: any) {
  ElMessage({
    message: '保存成功.',
    type: 'success',
  })
  props.dialogContext.data = data
  emits('dialogDataChanged', data)
}

function handleSubmit() {
  if (creating.value) {
    return props.dialogContext.createHandler(formData.value).then(handleChanged)
  } else {
    return props.dialogContext.updateHandler(formData.value).then(handleChanged)
  }
}

function beforeClose() {
  if (formDirty.value) {
    ElMessageBox.confirm(
        '是否保存修改',
        '确认保存', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
        }
    ).then(() => {
      handleSubmit().then(hide)
    }).catch(action => {
      if (action === 'cancel') {
        hide()
      }
    })
  } else {
    hide()
  }
}
</script>