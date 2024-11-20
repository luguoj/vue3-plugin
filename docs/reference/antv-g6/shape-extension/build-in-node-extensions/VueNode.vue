<script setup lang="tsx">
import {reactive, ref, watch, watchEffect} from "vue";
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import VueNodeComp from "./VueNodeComp.vue";

interface NodeDataType {
  id: string
  text: string
  count: number
}

// 图形渲染容器
const ctGraphRef = ref<HTMLDivElement>()
// 调用API渲染图形，获取图形实例对象引用
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  graph: {
    autoFit: 'view',
    layout: {
      type: 'grid',
      controlPoints: true
    },
    behaviors: ["drag-element"],
    node: {
      type: PsrAntvG6.Nodes.Types.VueNode,
      style: {
        component: ({data}: { data: { nodeData: NodeDataType } }) =>
            // 实现数据绑定，注意此处绑定无法实现响应性重绘，但是可以通过传入响应性对象
            <VueNodeComp
                comp-data={data.nodeData}
            />

      }
    },
  }
})

// 响应式的节点数据
const nodeDataRef = reactive<NodeDataType[]>([
  {
    id: '0',
    text: 'abc',
    count: 0
  },
  {
    id: '1',
    text: 'def',
    count: 0
  }
])

watch([graphRef, nodeDataRef], ([graph, nodeData]) => {
  if (graph) {
    graph.setData({
      // 构造节点图数据，不可以直接使用响应性对象
      nodes: nodeData.map(node => ({
        id: node.id,
        data: {
          // 通过data字段传值响应性对象
          nodeData: node
        }
      })),
      edges: [
        {source: '0', target: '1'}
      ]
    })
    graph.render()
  }
})
</script>

<template>
  <button class="inline-block" @click="nodeDataRef[0].count++">节点1:{{ nodeDataRef[0].count }}</button>
  <button class="inline-block ml-1" @click="nodeDataRef[1].count++">节点2:{{ nodeDataRef[1].count }}</button>
  <div style="height: 200px;position: relative;overflow: hidden;">
    <div style="height:100%;" ref="ctGraphRef"/>
  </div>
</template>