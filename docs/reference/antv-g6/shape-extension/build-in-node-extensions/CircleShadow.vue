<script setup lang="ts">
import {ref, watch} from "vue";
import {PsrAntvG6,} from "@psr-framework/vue3-plugin";

const ctGraphRef = ref<HTMLDivElement>()
const graph = PsrAntvG6.useGraph(ctGraphRef)

// 注册节点
const node = PsrAntvG6.useNodeWithExtensions({
  extendShape: 'circle',
  extensions: [
    {
      type: 'circle-shadow',
      cfg:{
        // 缩放尺寸
        diffSize: 5,
        // 动画时长
        duration: 1500
      }
    }
  ]
})

// 当图形和节点初始化完成后绘制节点
watch(() => ({graph: graph.value, node: node.value}), ({graph, node}) => {
  if (graph && node) {
    const _graph = graph
    _graph.data({
      nodes: [
        {
          id: '1',
          type: node
        }
      ]
    })
    _graph.render()
    // 为节点启用动画
    _graph.getNodes().forEach(node => {
      node.setState('circle-shadow', true)
    })
  }
})
</script>

<template>
  <div style="height: 150px;" ref="ctGraphRef"/>
</template>