<template>
  <div>
    <div v-psr-resize-observer="handleResize" style="height: 100%;width: 100%;" ref="echartsContainerRef"/>
  </div>
</template>

<script setup lang="ts" generic="T extends ECBasicOption">
import {ref, shallowRef, watchEffect} from "vue";
import {usePsrColorScheme, vPsrResizeObserver} from "@psr-framework/vue3-plugin-utils";
import * as echarts from "echarts";
import {EChartsType} from "echarts/types/dist/echarts";
import {ECBasicOption} from "echarts/types/dist/shared";

const echartsContainerRef = ref<HTMLDivElement>();
const echartsRef = shallowRef<EChartsType>()
const props = withDefaults(defineProps<{
  chartDarkTheme?: boolean
  chartOptions?: T
}>(), {
  chartDarkTheme: false
});

const colorScheme = usePsrColorScheme()

watchEffect(() => {
  if (echartsContainerRef.value) {
    if (echartsRef.value) {
      echartsRef.value.dispose()
      echartsRef.value = undefined
    }
    echartsRef.value = echarts.init(echartsContainerRef.value, (props.chartDarkTheme || colorScheme.value == 'dark') ? 'dark' : 'light')
  }
})
let currentOptions: any
watchEffect(() => {
  if (echartsRef.value) {
    if (props.chartOptions) {
      echartsRef.value.setOption(props.chartOptions, {
        notMerge: currentOptions !== props.chartOptions
      })
      currentOptions = props.chartOptions
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