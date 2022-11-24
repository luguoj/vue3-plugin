<template>
  <el-button @click="onClick" :loading="synchronizing">
    <slot/>
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
  buttonAction: Function,
}>()

const synchronizing = ref(false)

function onClick() {
  if (props.buttonAction) {
    if (synchronizing.value === false) {
      synchronizing.value = true
      const result = props.buttonAction()
      if (result instanceof Promise) {
        result.finally(() => {
          synchronizing.value = false
        })
      } else {
        synchronizing.value = false
      }
    }
  }
}
</script>
<style scoped>

</style>