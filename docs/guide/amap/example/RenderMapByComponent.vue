<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

// 视图模式
const viewMode = ref<'2D' | '3D'>('3D')

// 可响应式重绘
function switchViewMode() {
  if (viewMode.value == '3D') {
    viewMode.value = '2D'
  } else {
    viewMode.value = '3D'
  }
}
</script>

<template>
  <div style="height: 400px;">
    <button @click="switchViewMode">切换视图模式: {{ viewMode }}</button>
    <psr-a-map style="height: 100%;" :map-view-mode="viewMode"/>
  </div>
</template>