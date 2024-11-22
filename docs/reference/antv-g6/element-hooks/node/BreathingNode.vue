<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Circle, Diamond, Ellipse, Hexagon, HTML, Rect, Star, Triangle} from "@antv/g6";

// 动画状态关键字
const stateKey = 'breathingRunning'
// 注册呼吸节点类型
const nodeTypes = [Circle, Rect, Ellipse, Diamond, Triangle, Star, Hexagon, HTML].map(
    shape => PsrAntvG6.registerElement(
        'node',
        shape,
        {
          elHooksBuilders: [
            PsrAntvG6.ElementHooksBuilders.Node.useBreathingAnimation({
              // 配置运动状态字段
              stateKey
            })
          ]
        }
    )
)
</script>
<script setup lang="ts">
import {ref, watch} from "vue";
import {NodeData} from "@antv/g6";

const ctGraphRef = ref<HTMLDivElement>()
const graphRef = PsrAntvG6.useGraph(ctGraphRef, {
  graph: {
    autoResize: true,
    autoFit: 'center',
    layout: {
      type: 'grid',
      controlPoints: true
    },
    behaviors: ["drag-element"],
    data: {
      nodes: [
        ...nodeTypes.map(
            (nodeType, index) => {
              const style: NodeData['style'] = {
                size: [50, 25]
              }
              if (index == 7) {
                style.innerHTML =
                    `
                    <button
                        style="width:100%;height:100%;"
                    >HTML</button>
                    `
                style.dx = -25
                style.dy = -12.5
              }
              return {
                id: '' + index,
                type: nodeType,
                style
              } as NodeData
            }
        )
      ]
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