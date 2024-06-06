<script setup lang="ts">
import {ref} from "vue";
import {PsrDragResize} from "@psr-framework/vue3-plugin";

const width = ref(100)
const height = ref(100)
const top = ref(0)
const left = ref(0)

function resize(newRect: any) {
  width.value = newRect.width;
  height.value = newRect.height;
  top.value = newRect.top;
  left.value = newRect.left;
}
</script>

<template>
  <div style="height: 400px;position: relative;">
    <psr-drag-resize
        :isActive="true"
        :x="top"
        :y="left"
        :w="width"
        :h="height"
        v-on:resizing="resize"
        v-on:dragging="resize"
        parent-limitation
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }} </p>
      <p>{{ width }} х {{ height }}</p>
    </psr-drag-resize>
  </div>
</template>
