<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const zoom = ref<number>()
const zoomingFlag = ref<boolean>()
const zoomRange = ref<[number, number]>([2, 26])
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="zoomingFlag = false;zoomRange[0]=zoomRange[0] - 1;">MIN-</button>
    <button class="el-button" @click="zoomingFlag = false;zoomRange[0]=zoomRange[0] + 1;">MIN+</button>
    <button class="el-button" @click="zoomingFlag = false;zoom=(zoom||0) - 0.3;">-</button>
    <button class="el-button" @click="zoomingFlag = false;zoom=(zoom||0) + 0.3">+</button>
    <button class="el-button" @click="zoomingFlag = false;zoomRange[1]=zoomRange[1] - 1">MAX-</button>
    <button class="el-button" @click="zoomingFlag = false;zoomRange[1]=zoomRange[1] + 1">MAX+</button>
    <psr-a-map
        style="height: 100%;"
        :map-zoom-range="zoomRange"
        v-model:map-zoom="zoom"
        v-model:map-zooming-flag="zoomingFlag"
    >
      <div>zoom: {{ zoom || "?" }} ~ [{{ zoomRange[0] }}, {{ zoomRange[1] }}]</div>
      <div>zooming: {{ zoomingFlag }}</div>
    </psr-a-map>
  </div>
</template>