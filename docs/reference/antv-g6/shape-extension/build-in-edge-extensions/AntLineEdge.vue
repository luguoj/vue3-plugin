<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Line} from "@antv/g6";

// 动画状态关键字
const stateKey = 'antLineRunning'
// 注册蚂蚁线边类型
const edgeType = PsrAntvG6.registerElementWithHooks(
    'edge',
    Line,
    () => [
      PsrAntvG6.Edges.Animations.AntLine.useHooks({
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
    edge: {
      // 使用蚂蚁线边类型
      type: edgeType,
    },
    data: {
      nodes: [
        {id: '0'},
        {id: '1'}
      ],
      edges: [
        {id: 'edge-1', source: '0', target: '1',}
      ]
    }
  }
})

let runningFlag = ref<boolean>(true)

watch([graphRef, runningFlag], ([graph, running]) => {
  if (graph) {
    graph.updateData({
      edges: [
        {
          id: 'edge-1',
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