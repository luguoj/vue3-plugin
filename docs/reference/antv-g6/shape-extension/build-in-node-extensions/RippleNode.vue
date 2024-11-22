<script setup lang="tsx">
import {ref, watch} from "vue";
import {Circle, Diamond, Ellipse, Hexagon, NodeData, Rect, Star, Triangle} from "@antv/g6";
import VueNodeComp from "./VueNodeComp.vue";

import {PsrAntvG6} from "@psr-framework/vue3-plugin";
// 动画状态关键字
const stateKey = 'rippleRunning'

// 注册涟漪节点类型
const nodeTypes = [Circle, Rect, Ellipse, Diamond, Triangle, Star, Hexagon, PsrAntvG6.Nodes.Shapes.VueNode].map(
    shape => PsrAntvG6.registerElementWithHooks(
        'node',
        shape,
        () => [
          PsrAntvG6.Nodes.Animations.RippleAnimation.useHooks({
            // 配置运动状态字段
            stateKey,
            // 配置涟漪宽度
            rippleWidth: 20,
            // 配置涟漪层数
            rippleLength: 2
          })
        ]
    )
)

const compData = {
  text: "a",
  count: 1
}


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
      nodes: [
        ...nodeTypes.map(
            (nodeType, index) => {
              const style: NodeData['style'] = {
                size: [50, 25]
              }
              if (index == 7) {
                style.component = () =>
                    <VueNodeComp
                        comp-data={
                          ({
                            text: "a",
                            count: 1
                          })
                        }
                        style="width:100%;height:100%;"
                    />
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