<script setup lang="ts">
import {ref} from "vue";
import {ElButton, ElInput, ElTable, ElTableColumn, ElTooltip} from "element-plus"
import {Close as IconClose, Plus as IconPlus} from "@element-plus/icons-vue"
import {PsrElHeaderMain} from "../../layout/border"

const modelValue = defineModel<string[]>('modelValue')
withDefaults(
    defineProps<{
      disabled?: boolean
      placeholder?: string
    }>(),
    {
      disabled: false,
      placeholder: '输入并回车添加项目'
    }
)

const inputTextRef = ref('')

function handleEnter() {
  if (inputTextRef.value) {
    modelValue.value = [...(modelValue.value || []), inputTextRef.value]
    inputTextRef.value = ''
  }
}

function handleDelete(indexToDel: number) {
  modelValue.value = modelValue.value && modelValue.value.filter((item, index) => index != indexToDel)
}
</script>

<template>
  <psr-el-header-main style="max-height: 15rem">
    <template #header>
      <el-input
          :placeholder="placeholder"
          :disabled="disabled"
          v-model="inputTextRef"
          v-bind="$attrs"
          @keydown.enter="handleEnter"
      >
        <template #append>
          <el-tooltip content="添加" placement="left">
            <el-button :disabled="disabled" @click="handleEnter" :icon="IconPlus"/>
          </el-tooltip>
        </template>
      </el-input>
    </template>
    <template #main>
      <el-table :data="modelValue" :show-header="false" style="height:100%;">
        <el-table-column>
          <template #default="{row}">
            {{ row }}
          </template>
        </el-table-column>
        <el-table-column width="45px">
          <template #default="{row,$index}">
            <el-tooltip content="移除" placement="left">
              <el-button
                  :disabled="disabled"
                  :icon="IconClose"
                  link
                  type="danger"
                  @click="handleDelete($index)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </psr-el-header-main>
</template>

<style scoped lang="scss">

</style>