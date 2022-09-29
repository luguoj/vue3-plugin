<template>
  <div>
    <div style="height: 100%;width: 100%;" ref="echartsContainerRef"/>
    <resize-observer @notify="handleResize"/>
  </div>
</template>

<script lang="ts">
export default {
  name: "PsrVue3Echarts"
}

</script>
<script setup lang="ts">
import 'vue3-resize/dist/vue3-resize.css'
import {ResizeObserver} from 'vue3-resize'
import {defineProps, ref, shallowRef, watchEffect} from "vue";
import * as echarts from "echarts";
import {EChartsType} from "echarts/types/dist/echarts";
import {ECBasicOption} from "echarts/types/dist/shared";

const echartsContainerRef = ref<HTMLDivElement>();
const echartsRef = shallowRef<EChartsType>()
const props = withDefaults(defineProps<{
  chartDarkTheme?: boolean
  chartOptions?: ECBasicOption
}>(), {
  chartDarkTheme: false
});

watchEffect(() => {
  if (echartsContainerRef.value) {
    if (echartsRef.value) {
      echartsRef.value.dispose()
      echartsRef.value = undefined
    }
    echartsRef.value = echarts.init(echartsContainerRef.value, props.chartDarkTheme ? 'dark' : 'light')
  }
})

watchEffect(() => {
  if (echartsRef.value) {
    if (props.chartOptions) {
      echartsRef.value.setOption(props.chartOptions, true)
    } else {
      echartsRef.value.setOption({}, true)
    }
  }
})

function handleResize() {
  if (echartsRef.value) {
    echartsRef.value.resize()
  }
}

defineExpose({
  echarts: echartsRef
})
</script>
<style lang="scss" scoped>

</style>