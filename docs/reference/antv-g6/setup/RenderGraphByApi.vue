<script setup lang="ts">
import {ref, watch} from "vue";
import {PsrAntvG6} from "@psr-framework/vue3-plugin";

// 图形渲染容器
const ctGraphRef = ref<HTMLDivElement>()
// 调用API渲染图形，获取图形实例对象引用
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  graph: {
    autoFit: 'view',
    layout: {
      type: 'antv-dagre',
      nodeSize: [60, 30],
      nodesep: 60,
      ranksep: 40,
      controlPoints: true
    },
    behaviors: ["drag-canvas", "zoom-canvas", "drag-element"],
    plugins: [
      {
        type: 'minimap'
      }
    ]
  }
})

watch(graphRef, graph => {
  if (graph) {
    new Promise((resolve, reject) => setTimeout(resolve, 500)).then(() => {
      graph.setData({
        nodes: [
          {id: '0'},
          {id: '1'},
          {id: '2'},
          {id: '3'},
          {id: '4'},
          {id: '5'},
          {id: '6'},
          {id: '7'},
          {id: '8'},
          {id: '9'},
        ],
        edges: [
          {source: '0', target: '1'},
          {source: '0', target: '2'},
          {source: '1', target: '4'},
          {source: '0', target: '3'},
          {source: '3', target: '4'},
          {source: '4', target: '5'},
          {source: '4', target: '6'},
          {source: '5', target: '7'},
          {source: '5', target: '8'},
          {source: '8', target: '9'},
          {source: '2', target: '9'},
          {source: '3', target: '9'},
        ]
      })
      graph.render()
    })
  }
})
</script>

<template>
  <div style="height: 200px;position: relative;overflow: hidden;">
    <div style="height:100%;" ref="ctGraphRef"/>
  </div>
</template>

<style scoped>

</style>