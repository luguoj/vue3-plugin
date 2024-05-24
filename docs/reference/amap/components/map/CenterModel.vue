<script setup lang="ts">
import {PsrAMap, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const center = ref<PsrAMapTypes.LngLat>({lng: 116.397428, lat: 39.90923})
</script>

<template>
  <div style="height: 400px;">
    <button @click="center={lat: (center?.lat||0) + 0.3, lng: (center?.lng||0) + 0.3}">移动
    </button>
    <psr-a-map
        style="height: 100%;"
        v-model:map-center="center"
    >
      <div>center: {{ center?.lng || "?" }}-{{ center?.lat || "?" }}</div>
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