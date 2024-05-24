<script setup lang="ts">
import {PsrAMap} from "@psr-framework/vue3-plugin";
import {computed, ref} from "vue";

const showBg = ref(true)
const showPoint = ref(true)
const showRoad = ref(true)
const showBuilding = ref(true)
const features = computed<AMap.Map.Feature[]>(() => {
  return [
    showBg.value ? "bg" : "",
    showPoint.value ? "point" : "",
    showRoad.value ? "road" : "",
    showBuilding.value ? "building" : "",
  ].filter(Boolean) as AMap.Map.Feature[]
})
</script>

<template>
  <div style="height: 400px;">
    <button @click="showBg=!showBg">地图背景: {{ showBg }}</button>
    <button @click="showPoint=!showPoint">兴趣点: {{ showPoint }}</button>
    <button @click="showRoad=!showRoad">道路: {{ showRoad }}</button>
    <button @click="showBuilding=!showBuilding">建筑物: {{ showBuilding }}</button>
    <psr-a-map
        style="height: 100%;"
        map-view-mode="3D"
        :map-zoom="18"
        :map-pitch="45"
        :map-features="features"
    />
  </div>
</template>

<style scoped>
button {
  border: 1px solid;
  margin-right: 5px;
  padding: 0 5px;
}
</style>