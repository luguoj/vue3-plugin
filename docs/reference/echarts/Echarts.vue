<template>
  <div style="height: 500px;">
    <button @click="isDark=!isDark">dark</button>
    <button @click="chart1">chart1</button>
    <button @click="chart2">chart2</button>
    <PsrEcharts
        style="width: 100%;height: 100%;"
        :chart-dark-theme="isDark"
        :chart-options="options"
        @chart-click="console.log('chart-click',$event)"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {PsrEcharts} from "@psr-framework/vue3-plugin";

const isDark = ref(false)
const options = ref<any>({})

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

chart1()
</script>