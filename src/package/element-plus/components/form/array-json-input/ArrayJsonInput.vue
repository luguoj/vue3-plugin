<script setup lang="ts">
import {ref, watch} from "vue";
import {ElButton, ElInput, ElTable, ElTableColumn, ElTooltip} from "element-plus"
import {Close as IconClose, InfoFilled as IconInfoFilled, Plus as IconPlus} from "@element-plus/icons-vue"
import {PsrElHeaderMain} from "../../layout/border"

const emits = defineEmits<{
  (e: 'jsonParseFailure', err: any): void
}>()

const modelValue = defineModel<string>('modelValue')
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
const values = ref<string[]>()
const inputTextRef = ref('')
const parseFailure = ref(false)

watch(modelValue, newValue => {
  if (newValue) {
    try {
      values.value = JSON.parse(newValue)
      parseFailure.value = false
    } catch (err) {
      parseFailure.value = true
      emits('jsonParseFailure', err)
    }
  } else {
    values.value = undefined
    parseFailure.value = false
  }
}, {immediate: true})

watch(values, newValues => {
  const valueJson = JSON.stringify(newValues)
  if (valueJson !== modelValue.value) {
    modelValue.value = valueJson
  }
})

function handleEnter() {
  if (inputTextRef.value) {
    values.value = [...(values.value || []), inputTextRef.value]
    inputTextRef.value = ''
  }
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
      <el-table :data="parseFailure?[]:values" :show-header="false" style="height:100%;">
        <template #empty>
          <div>
            <span
                v-if="parseFailure"
                style="color:var(--el-color-danger)"
            >
              Invalid JSON Value
              <el-tooltip :content="modelValue"><el-button link :icon="IconInfoFilled"/></el-tooltip>
            </span>
            <span v-else>No data</span>
          </div>
        </template>
        <el-table-column>
          <template #default="{row}">
            {{ row }}
          </template>
        </el-table-column>
        <el-table-column width="45px">
          <template #default="{row}">
            <el-tooltip content="移除" placement="left">
              <el-button
                  :disabled="disabled"
                  :icon="IconClose"
                  link
                  type="danger"
                  @click="values = values && values.filter(item => item !== row)"
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