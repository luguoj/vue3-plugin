<script setup lang="ts">
import {PsrAMap, PsrAMapMarkerCluster} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const visible = ref(true)

const markerCluster = ref<AMap.MarkerCluster.DataOptions[]>([])
for (let i = 0; i < 100; i++) {
  const element: AMap.MarkerCluster.DataOptions = {
    weight: 1,
    lnglat: [116.397428 + Math.random() * 0.002 - 0.001, 39.90923 + Math.random() * 0.002 - 0.001],
    title: 'title-' + i
  };
  markerCluster.value.push(element)
}
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="visible=!visible">开/关点标记: {{ visible }}</button>
    <psr-a-map
        style="height: 100%;"
        :map-center="{lng:116.397428,lat:39.90923}"
    >
      <template #default="{map}">
        <psr-a-map-marker-cluster
            :a-map="map"
            :cluster-data="markerCluster"
        />
      </template>
    </psr-a-map>
  </div>
</template>