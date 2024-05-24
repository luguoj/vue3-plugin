<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const pitch = ref<number>()
const pitchingFlag = ref<boolean>()
</script>

<template>
  <div style="height: 400px;">
    <button @click="pitchingFlag = false;pitch=(pitch||0) - 15;">-</button>
    <button @click="pitchingFlag = false;pitch=(pitch||0) + 15">+</button>
    <psr-a-map
        style="height: 100%;"
        map-view-mode="3D"
        v-model:map-pitch="pitch"
        v-model:map-pitching-flag="pitchingFlag"
    >
      <div>pitch: {{ pitch || "0" }}</div>
      <div>pitching: {{ pitchingFlag }}</div>
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