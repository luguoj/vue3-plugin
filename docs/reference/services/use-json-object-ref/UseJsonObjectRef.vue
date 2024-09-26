<script setup lang="ts">
import {ref} from "vue";
import {ElForm, ElFormItem, ElInput, ElInputNumber, ElSwitch} from "element-plus"
import {useJsonObjectRef} from "@psr-framework/vue3-plugin"

interface ObjectType {
  name: string
  age: number
  enabled: boolean
}

const jsonRef = ref('{}')
const objectRef = useJsonObjectRef<ObjectType>(jsonRef)
</script>

<template>
  <el-form-item label="JSON">
    <el-input type="textarea" v-model="jsonRef"/>
  </el-form-item>
  <el-form v-if="objectRef">
    <el-form-item label="姓名">
      <el-input v-model="objectRef.name"/>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input-number v-model="objectRef.age"/>
    </el-form-item>
    <el-form-item label="启用">
      <el-switch v-model="objectRef.enabled"/>
    </el-form-item>
  </el-form>
</template>
