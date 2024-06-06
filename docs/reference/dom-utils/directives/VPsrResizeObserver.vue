<template>
  <div v-psr-resize-observer="callback">ResizeObserver: {{ size.width }},{{ size.height }}</div>
</template>

<script setup lang="ts">
import {vPsrResizeObserver} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const size = ref<{ width: number, height: number }>({width: 0, height: 0})

function callback(entry: ResizeObserverEntry) {
  size.value.width = Math.floor(entry.contentRect.width)
  size.value.height = Math.floor(entry.contentRect.height)
}
</script>