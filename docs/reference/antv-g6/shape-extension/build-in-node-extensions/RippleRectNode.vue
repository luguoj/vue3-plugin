<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Circle, Diamond, Ellipse, Rect} from "@antv/g6";

// 动画状态关键字
const stateKey = 'rippleRunning'

// 注册涟漪节点类型
const nodeTypes = [Circle, Rect, Ellipse, Diamond].map(
    shape => PsrAntvG6.registerElementWithHooks(
        'node',
        shape,
        () => [
          PsrAntvG6.Nodes.Animations.RippleRectAnimation.useHooks({
            // 配置运动状态字段
            stateKey
          })
        ]
    )
)

</script>
<script setup lang="ts">
import {ref, watch} from "vue";
import {NodeData} from "@antv/g6";

const nodes: NodeData[] = nodeTypes.map(
    (nodeType, index) => (
        {
          id: '' + index,
          type: nodeType
        } as NodeData
    )
)

const ctGraphRef = ref<HTMLDivElement>()
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  graph: {
    autoFit: 'view',
    layout: {
      type: 'grid',
      controlPoints: true
    },
    behaviors: ["drag-element"],
    data: {
      nodes
    }
  }
})

let runningFlag = ref<boolean>(true)

watch([graphRef, runningFlag], ([graph, running]) => {
  if (graph) {
    graph.updateData({
      nodes: [
        {
          id: '0',
          style: {
            // 更新动画运动状态
            [stateKey]: running
          }
        },
        {
          id: '1',
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