<script setup lang="ts">
import {PsrAMap, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const center = ref<PsrAMapTypes.LngLat>({lng: 116.397428, lat: 39.90923})
const movingFLag = ref<boolean>()
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="movingFLag=false;center={lat: (center?.lat||0) + 0.3, lng: (center?.lng||0) + 0.3};">移动
    </button>
    <psr-a-map
        style="height: 100%;"
        v-model:map-center="center"
        v-model:map-moving-flag="movingFLag"
    >
      <div>center: {{ center?.lng || "?" }}-{{ center?.lat || "?" }}</div>
      <div>moving: {{ movingFLag}}</div>
    </psr-a-map>
  </div>
</template>