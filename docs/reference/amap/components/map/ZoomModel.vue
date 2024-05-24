<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const zoom = ref<number>()
const zoomingFlag = ref<boolean>()
</script>

<template>
  <div style="height: 400px;">
    <button @click="zoomingFlag = false;zoom=(zoom||0) - 0.3;">-</button>
    <button @click="zoom=(zoom||0) + 0.3">+</button>
    <psr-a-map
        style="height: 100%;"
        v-model:map-zoom="zoom"
        v-model:map-zooming-flag="zoomingFlag"
    >
      <div>zoom: {{ zoom || "?" }}</div>
      <div>zooming: {{ zoomingFlag}}</div>
    </psr-a-map>
  </div>
</template>

<style scoped>
button {
  border: 1px solid;
  margin-right: 5px;
  padding: 0 5px;
}
</style>