<template>
  <el-button @click="onClick" :loading="synchronizing">
    <template #default v-if="$slots.default">
      <slot/>
    </template>
    <template #icon v-if="$slots.icon">
      <slot name="icon"/>
    </template>
  </el-button>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {ElButton} from "element-plus";
import 'element-plus/es/components/button/style/css'

const props = defineProps<{
  buttonAction: (params?: any) => Promise<any> | any,
  buttonActionParams?: any
}>()

const synchronizing = ref(false)

function onClick() {
  if (synchronizing.value === false && typeof props.buttonAction === 'function') {
    synchronizing.value = true
    const result = props.buttonAction(props.buttonActionParams)
    if (result instanceof Promise) {
      result.finally(() => {
        synchronizing.value = false
      })
    } else {
      synchronizing.value = false
    }
  }
}
</script>
<style scoped>

</style>