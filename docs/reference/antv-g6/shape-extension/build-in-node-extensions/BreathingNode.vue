<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Rect,Star} from "@antv/g6";

// 动画状态关键字
const stateKey = 'breathingRunning'
// 注册呼吸节点类型
const nodeType = PsrAntvG6.registerElementWithHooks(
    'node',
    Star,
    () => [
      PsrAntvG6.Nodes.Animations.BreathingAnimation.useHooks({
        // 配置运动状态字段
        stateKey
      })
    ]
)
</script>
<script setup lang="ts">
import {ref, watch} from "vue";

const ctGraphRef = ref<HTMLDivElement>()
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  graph: {
    autoFit: 'view',
    layout: {
      type: 'grid',
      controlPoints: true
    },
    behaviors: ["drag-element"],
    node: {
      // 使用呼吸节点类型
      type: nodeType,
      style: {
        halo: true
      }
    },
    data: {
      nodes: [
        {id: 'n0'},
        {id: 'n1'}
      ],
      edges: [
        {id: 'edge-1', source: 'n0', target: 'n1',}
      ]
    }
  }
})

let runningFlag = ref<boolean>(true)

watch([graphRef, runningFlag], ([graph, running]) => {
  if (graph) {
    graph.updateData({
      nodes: [
        {
          id: 'n0',
          style: {
            // 更新动画运动状态
            [stateKey]: running
          }
        }
      ]
    })
    graph.render()
  }
}, {immediate: true})

</script>

<template>
  <div style="height: 200px;position: relative;overflow: hidden;">
    <button @click="runningFlag=!runningFlag">{{ runningFlag ? 'stop' : 'run' }}</button>
    <div style="height:100%;" ref="ctGraphRef"/>
  </div>
</template>