<template>
  <div>
    <div style="position: relative;height: 100%;">
      <div
          ref="echartsContainerRef"
          style="position: absolute; height: 100%;width: 100%;"
          v-psr-resize-observer="handleResize"
      />
      <slot :echarts="echartsRef"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, shallowRef, useAttrs, watch, watchEffect} from "vue";
import {usePsrColorScheme, vPsrResizeObserver} from "../dom-utils";
import * as echartsNs from "echarts";

const echartsContainerRef = ref<HTMLDivElement>();
const echartsRef = shallowRef<echartsNs.EChartsType>()
const props = withDefaults(defineProps<{
  chartDarkTheme?: boolean
  chartOptions?: any
}>(), {
  chartDarkTheme: false
});

const emits = defineEmits<{
  (e: 'chartReady', chart: echartsNs.EChartsType): void
}>()

const colorScheme = usePsrColorScheme()

watchEffect(() => {
  if (echartsContainerRef.value) {
    if (echartsRef.value) {
      echartsRef.value.dispose()
      echartsRef.value = undefined
    }
    echartsRef.value = echartsNs.init(echartsContainerRef.value, (props.chartDarkTheme || colorScheme.value == 'dark') ? 'dark' : 'light')
    emits('chartReady', echartsRef.value)
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

const attrs = useAttrs()
// 获取所有监听器
const chartEventListeners: Record<string, any> = Object
    .keys(attrs)
    .filter(key => key.startsWith('onChart'))
    .reduce((acc: Record<string, any>, key) => {
      acc[key.replace('onChart', '').toLowerCase()] = attrs[key]
      return acc
    }, {})
watch(echartsRef, echarts => {
  if (echarts) {
    for (const key in chartEventListeners) {
      echarts.on(key, chartEventListeners[key])
    }
  }
})
</script>