<script setup lang="ts">
import {shallowRef, watch} from "vue";
import {PsrJoint} from "@psr-framework/vue3-plugin";

const divRef = shallowRef<HTMLDivElement>()

const jointRef = PsrJoint.useJoint()
const graphRef = PsrJoint.useGraph()
const paperRef = PsrJoint.usePaper(divRef, graphRef, {
  height: 600,
  width: 800,
  background: {color: '#F5F5F5'},
  drawGrid: 'mesh'
})

watch(() => ({joint: jointRef.value, graph: graphRef.value}), ({joint, graph}) => {
  if (!joint || !graph) {
    return
  }
  const rect = new joint.shapes.standard.Rectangle();
  rect.position(100, 30)
  rect.resize(100, 40)
  rect.attr({
    body: {
      fill: 'blue'
    },
    label: {
      text: 'Hello',
      fill: 'white'
    }
  })
  rect.addTo(graph)
  const rect2 = rect.clone();
  rect2.translate(300, 0)
  rect2.attr('label/text', 'World!')
  rect2.addTo(graph)
  const link = new joint.shapes.standard.Link();
  link.source(rect)
  link.target(rect2)
  link.addTo(graph)
})
</script>

<template>
  <button @click="paperRef?.fitToContent()">Fit to content</button>
  <div style="height: 200px;overflow:auto;">
    <div ref="divRef"/>
  </div>
</template>
