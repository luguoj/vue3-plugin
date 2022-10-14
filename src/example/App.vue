<script setup lang="ts">
import {ref} from "vue";
import PsrVue3DragResize from "../package/components/drag-resize/DragResize.vue";

const width = ref(0)
const height = ref(0)
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
  <psr-vue3-drag-resize :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
    <h3>Hello World!</h3>
    <p>{{ top }} х {{ left }} </p>
    <p>{{ width }} х {{ height }}</p>
  </psr-vue3-drag-resize>
</template>

<style scoped>
</style>
