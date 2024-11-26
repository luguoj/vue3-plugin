<script lang="ts">
import {PsrAntvG6} from "@psr-framework/vue3-plugin";
import {Cubic} from "@antv/g6";

// 动画状态关键字
const stateKey = 'antLineRunning'
// 注册路径入场边类型
const edgeType = PsrAntvG6.registerElement(
    'edge',
    Cubic,
    {
      elHooksBuilders: [
        PsrAntvG6.ElementHooksBuilders.Edge.usePathInAnimation({})
      ]
    }
)
</script>
<script setup lang="ts">
import {ref, watch} from "vue";

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
    edge: {
      // 使用路径入场边类型
      type: edgeType,
      animation: {
        // 关闭默认的入场和退场动画
        enter: false,
        exit: false
      }
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

let connectedFlag = ref<boolean>(true)

watch([graphRef, connectedFlag], ([graph, connectedFlag]) => {
  if (graph) {
    if (connectedFlag) {
      graph.addEdgeData([{id: 'edge-1', source: '0', target: '1',}])
    } else {
      graph.removeEdgeData(['edge-1'])
    }
    graph.draw()
  }
}, {immediate: true})
</script>

<template>
  <div style="height: 200px;position: relative;overflow: hidden;">
    <button @click="connectedFlag=!connectedFlag">{{ connectedFlag ? 'disconnect' : 'connect' }}</button>
    <div style="height:100%;" ref="ctGraphRef"/>
  </div>
</template>