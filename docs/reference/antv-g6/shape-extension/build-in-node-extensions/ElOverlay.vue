<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {PsrAntvG6,} from "@psr-framework/vue3-plugin";
import VueNodeComp from "./VueNodeComp.vue";

const ctGraphRef = ref<HTMLDivElement>()
const graph = PsrAntvG6.useGraph(ctGraphRef)

// 注册自定义标签
const VueNodeTag = PsrAntvG6.useElWithComponent({
  component: VueNodeComp
})
// 注册覆盖标签的节点
const node = PsrAntvG6.useNodeWithExtensions({
  extendShape: 'rect',
  extensions: [
    {
      type: 'el-overlay',
      cfg: {
        // 覆盖的EL标签
        tag: VueNodeTag
      }
    }
  ]
})
// 节点数据
const node1Data = reactive({compText: 'test1', compNumber: 1})
// 当图形和节点初始化完成后绘制节点
// 注意: 此处不能使用watchEffect，否则每次节点数据变化将重绘节点
watch(() => ({graph: graph.value, node: node.value}), ({graph, node}) => {
  if (graph && node) {
    const _graph = graph
    _graph.data({
      nodes: [
        {
          id: '1',
          type: node,
          data: node1Data
        }
      ]
    })
    _graph.render()
  }
})
</script>

<template>
  <button @click="node1Data.compNumber++">click me</button>
  <div style="height: 150px;" ref="ctGraphRef"/>
</template>