<template>
  <button @click="isDark=!isDark">dark</button>
  <button @click="chart1">chart1</button>
  <button @click="chart2">chart2</button>
  <PsrVue3Echarts
      style="width: 100%;height: 100%;"
      :chart-dark-theme="isDark"
      :chart-options="options"
      ref="echartsRef"
      @chart-click="console.log('chart-click',$event)"
  />
</template>

<script lang="ts">
export default {
  name: "ComponentsSample"
}
</script>
<script setup lang="ts">
import {ref} from "vue";
import {PsrVue3EchartsExpose, PsrVue3Echarts} from "../package";

const isDark = ref(false)
const options = ref<any>({})
const echartsRef = ref<PsrVue3EchartsExpose>()

function chart1() {
  options.value = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  };
}

function chart2() {
  options.value = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };
}
</script>
<style scoped>

</style>