<template>
  <el-button @click="handleCreate">create</el-button>
  <el-button @click="handleModify">modify</el-button>
  <psr-el-create-update-form-dialog :dialog-context="context">
    <template #default="{formData,creating}">
      <el-form-item label="id">
        <el-input v-model="formData.id" :disabled="!creating"/>
      </el-form-item>
      <el-form-item label="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      creating:{{ creating }} - {{ formData }}
    </template>
  </psr-el-create-update-form-dialog>
</template>

<script setup lang="ts">
import {PsrCreateUpdateFormDialogContext, PsrElCreateUpdateFormDialog} from "@psr-framework/vue3-plugin";
import {ElButton, ElFormItem, ElInput} from "element-plus"

// 表单数据类型
interface Data {
  id: string,
  name: string
}

// 表单对话框上下文
const context = PsrCreateUpdateFormDialogContext.create<Data>({
  defaultData: () => { // 构造表单数据默认值
    return {id: '', name: ''}
  },
  createHandler: (data: Data) => // 创建操作处理函数
      new Promise(resolve => setTimeout(() => resolve(data), 3000)),
  updateHandler: (data: Data) => // 修改操作处理函数
      new Promise(resolve => setTimeout(() => resolve(data), 3000))
})

// 触发创建表单弹窗
function handleCreate() {
  context.show()
}

// 触发修改表单弹窗
function handleModify() {
  context.show({id: 'test', name: 'test'})
}
</script>