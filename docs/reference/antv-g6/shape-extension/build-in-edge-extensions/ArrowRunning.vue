<script setup lang="ts">
import {PsrAntvG6,} from "@psr-framework/vue3-plugin";
import {ref, watchEffect} from "vue";

const ctGraphRef = ref<HTMLDivElement>()
const graph = PsrAntvG6.useGraph(ctGraphRef)

// 注册边类型
const edge = PsrAntvG6.useEdgeWithExtensions({
  extendShape: 'line',
  extensions: [
    {
      type: 'arrow-running',
      cfg: {
        // 线条样式
        stroke: '#1890ff',
        // 填充色
        fill: '#1890ff',
        // 是否重放
        repeat: true,
        // 动画时长
        duration: 2000
      }
    }
  ]
})

watchEffect(() => {
  if (graph.value && edge.value) {
    const _graph = graph.value
    _graph.data({
      nodes: [
        {id: '1',},
        {id: '2',}
      ],
      edges: [
        {
          source: '1',
          target: '2',
          type: edge.value
        }
      ]
    })
    _graph.render()
    // 为边启用动画
    _graph.getEdges().forEach(edge => {
      edge.setState('arrow-running', true)
    })
  }
})
</script>

<template>
  <div style="height: 150px;" ref="ctGraphRef"/>
</template>

<style scoped>

</style>