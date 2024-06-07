<script setup lang="ts">
import {PsrAntvG6,} from "@psr-framework/vue3-plugin";
import {ref, watchEffect} from "vue";

// 图形渲染容器
const ctGraphRef = ref<HTMLDivElement>()
// 小地图渲染容器
const ctMiniMapRef = ref<HTMLDivElement | undefined>()
// 调用API渲染图形，获取图形实例对象引用
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  minimapCfg: {
    container: ctMiniMapRef,
  }
})

watchEffect(() => {
  if (graphRef.value) {
    const graph = graphRef.value
    new Promise((resolve, reject) => setTimeout(resolve, 500)).then(() => {
      graph.data({
        nodes: [{
          id: '1',
          label: '1',
          size: [80, 20],
          type: 'rect'
        }, {
          id: '2',
          label: '2',
          size: 50,
          type: 'rect',
        }, {
          id: '3',
          label: '3',
          size: [50, 25],
          style: {
            fill: 'red'
          },
          type: 'rect',
        }],
        edges: [{
          source: '1',
          target: '2',
          type: 'line'
        }, {
          source: '2',
          target: '3',
          type: 'line'
        }, {
          source: '3',
          target: '1',
          type: 'line'
        }]
      })
      graph.render()
    })
  }
})
</script>

<template>
  <div style="height: 200px;position: relative;overflow: hidden;">
    <div style="height:100%;" ref="ctGraphRef"/>
    <div style="width: 150px;right: 10px;top:10px;position: absolute;" ref="ctMiniMapRef"/>
  </div>
</template>

<style scoped>

</style>