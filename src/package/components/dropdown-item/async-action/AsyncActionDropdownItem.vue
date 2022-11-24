<template>
  <el-dropdown-item @click="onClick" :disabled="synchronizing">
    <el-icon v-if="synchronizing" class="is-loading">
      <icon-loading/>
    </el-icon>
    <template v-else>
      <slot name="icon"/>
    </template>
    <slot/>
  </el-dropdown-item>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {ElDropdownItem, ElIcon} from "element-plus";
import "element-plus/es/components/dropdown-item/style/css"
import "element-plus/es/components/icon/style/css"
import {Loading as IconLoading} from "@element-plus/icons-vue";

const props = defineProps<{
  itemAction: (params?: any) => Promise<any> | any,
  itemActionParams?: any
}>()
const synchronizing = ref(false)

function onClick() {
  if (synchronizing.value === false && typeof props.itemAction === 'function') {
    synchronizing.value = true
    const result = props.itemAction(props.itemActionParams)
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