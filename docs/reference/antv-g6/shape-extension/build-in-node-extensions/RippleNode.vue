<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Circle, Diamond, Ellipse, Rect} from "@antv/g6";
import {Ellipse as GEllipse} from "@antv/g-lite"
// 动画状态关键字
const stateKey = 'rippleRunning'

// 注册涟漪节点类型
const nodeTypes = [Circle, Rect, Ellipse, Diamond].map(
    shape => PsrAntvG6.registerElementWithHooks(
        'node',
        shape,
        () => [
          PsrAntvG6.Nodes.Animations.RippleAnimation.useHooks({
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

const nodes: NodeData[] = [
  ...nodeTypes.map(
      (nodeType, index) => (
          {
            id: '' + index,
            type: nodeType,
            style: {
              size: [50, 25]
            }
          } as NodeData
      )
  )
]

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
        ...nodeTypes.map(
            (_, index) => (
                {
                  id: '' + index,
                  style: {
                    // 更新动画运动状态
                    [stateKey]: running
                  }
                } as NodeData
            )
        )
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