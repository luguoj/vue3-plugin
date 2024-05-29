<script setup lang="ts">
import {PsrAMap, PsrAMapMarkerCluster, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

type DataOptions = PsrAMapTypes.ClusterMarkerData<void>

const markerCluster = ref<DataOptions[]>([])
for (let i = 0; i < 100; i++) {
  markerCluster.value.push({
    weight: 1,
    position: {
      lng: 116.397428 + Math.random() * 0.002 - 0.001,
      lat: 39.90923 + Math.random() * 0.002 - 0.001
    }
  })
}
</script>

<template>
  <div style="height: 400px;">
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