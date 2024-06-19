<script setup lang="ts">
import {ref, shallowRef, watch} from "vue";
import {PsrJoint} from "@psr-framework/vue3-plugin";
import * as JointNs from "@joint/core"

const divRef = shallowRef<HTMLDivElement>()

const jointRef = PsrJoint.useJoint()
const graphRef = PsrJoint.useGraph()
const paperRef = PsrJoint.usePaper(divRef, graphRef, {
  height: '100%',
  width: '100%',
  background: {color: '#F5F5F5'},
  drawGrid: 'mesh',
  // 限制元素在画布内移动
  restrictTranslate: true
})

watch(() => ({joint: jointRef.value, graph: graphRef.value, paper: paperRef.value}), ({joint, graph, paper}) => {
  if (!joint || !graph || !paper) {
    return
  }


  const rect = buildRect(boxBlock1.value, joint, graph, paper)
  const rect2 = buildRect(boxBlock2.value, joint, graph, paper)
  const link = new joint.shapes.standard.Link();
  link.source(rect)
  link.target(rect2)
  link.addTo(graph)
})

interface Box {
  width: number
  height: number
  left: number
  top: number
}

const boxBlock1 = ref<Box>({
  width: 100,
  height: 40,
  left: 100,
  top: 30
})

const boxBlock2 = ref<Box>({
  width: 100,
  height: 40,
  left: 400,
  top: 30
})

function computeBoxStyle(box: Box): any {
  return {
    ...box,
    width: box.width ? (box.width + "px") : 0,
    height: box.height ? (box.height + "px") : 0,
    left: box.left ? (box.left + "px") : 0,
    top: box.top ? (box.top + "px") : 0,
  }
}

function buildRect(box: Box, joint: typeof JointNs, graph: JointNs.dia.Graph, paper: JointNs.dia.Paper) {
  const rect = new joint.shapes.standard.Rectangle({
    position: {x: box.left - 2, y: box.top - 20},
    size: {width: box.width + 6, height: box.height + 24},
    attrs: {
      body: {
        style: {
          // 线色
          stroke: "var(--border-color)",
          // 填充色
          fill: "var(--bg-color)",
          // 线型
          "stroke-dasharray": "5,1"
        },
        strokeWidth: 1
      },
      label: {
        text: 'rect',
        // 文本置顶
        refY: 0,
        // 文本顶部对其
        yAlignment: 'top',
        style: {}
      }
    },
  }).addTo(graph);
  // 鼠标移入显示边框工具
  const rectView = rect.findView(paper).addTools(
      new joint.dia.ToolsView({
        tools: [
          new joint.elementTools.Boundary()
        ]
      })
  ).hideTools()

  function onMouseEnter(elementView: JointNs.dia.CellView) {
    if (elementView == rectView) {
      elementView.showTools();
    }
  }

  function onMouseLeave(elementView: JointNs.dia.CellView) {
    if (elementView == rectView) {
      elementView.hideTools();
    }
  }


  paper.on('element:mouseenter', onMouseEnter)
  paper.on('element:mouseleave', onMouseLeave)

  // 位置改变时更新参数
  function onPositionChange(cell: JointNs.dia.Cell) {
    if (cell == rect) {
      const pos = cell.getBBox().topLeft()
      box.left = pos.x + 2
      box.top = pos.y + 22
    }
  }

  graph.on('change:position', onPositionChange)
  return rect
}
</script>

<template>
  <div style="height:200px;">
    <div style="position: relative;height: 100%;">
      <div ref="divRef"
           style="height: 100%;width: 100%;position: absolute;--border-color: grey;--bg-color: #EEEEEE;"/>
      <div style="height: 100%;width: 100%;position: absolute;left:0;top:0;pointer-events: none">
        <div class="element-content" style="position: absolute;" :style="computeBoxStyle(boxBlock1)">block1</div>
        <div class="element-content" style="position: absolute;" :style="computeBoxStyle(boxBlock2)">block2</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.element-content {
  pointer-events: all;
  border: solid 1px;
}
</style>
