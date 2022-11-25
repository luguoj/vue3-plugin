<template>
  <button @click="handleCreate">create</button>
  <button @click="handleModify">modify</button>
  <psr-create-update-from-dialog :dialog-model="model">
    <template #default="{formData,creating}">
      <el-form-item label="id">
        <el-input v-model="formData.id" :disabled="!creating"/>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      creating:{{ creating }} - {{ formData }}
    </template>
  </psr-create-update-from-dialog>
</template>

<script setup lang="ts">
import {PsrCreateUpdateFormDialogModel, PsrCreateUpdateFromDialog} from "../package"
import {ElFormItem, ElInput} from "element-plus"
import "element-plus/es/components/form-item/style/css"
import "element-plus/es/components/input/style/css"

interface Data {
  id: string,
  name: string
}

const model = PsrCreateUpdateFormDialogModel.create<Data>({
  defaultData: () => {
    return {id: '', name: ''}
  },
  createHandler: (data: Data) => new Promise(resolve => setTimeout(() => resolve(data), 3000)),
  updateHandler: (data: Data) => new Promise(resolve => setTimeout(() => resolve(data), 3000))
})

function handleCreate() {
  model.show()
}

function handleModify() {
  model.show({id: 'test', name: 'test'})
}

</script>

<style scoped>

</style>