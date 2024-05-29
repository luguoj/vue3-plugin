<script setup lang="ts">
import {PsrAMap, PsrAMapMarkerCluster} from "@psr-framework/vue3-plugin";
import {ref} from "vue";
import ContentComponent from "../marker/ContentComponent.vue";

const visible = ref(true)

const markerCluster = ref<AMap.MarkerCluster.DataOptions[]>([])
let i = 0
let timer = setInterval(() => {
  const element: AMap.MarkerCluster.DataOptions = {
    weight: 1,
    lnglat: [116.397428 + Math.random() * 0.002 - 0.001, 39.90923 + Math.random() * 0.002 - 0.001],
    title: 'title-' + i
  };
  markerCluster.value.push(element)
  if (i++ > 100) {
    clearInterval(timer)
  }
}, 50)
</script>

<template>
  <div style="height: 400px;">
    <button @click="visible=!visible">开/关点标记: {{ visible }}</button>
    <psr-a-map
        style="height: 100%;"
        :map-center="{lng:116.397428,lat:39.90923}"
    >
      <template #default="{map}">
        <psr-a-map-marker-cluster
            :a-map="map"
            :cluster-data="markerCluster"
            :cluster-custom-marker = "false"
            cluster-custom-cluster-marker
        >
          <template #marker="{markerData}">
            <content-component :model-value="`${markerData.title}`"/>
          </template>
          <template #cluster-marker="{clusterMarkerData}">
            <div>{{ clusterMarkerData.data.count }}</div>
          </template>
        </psr-a-map-marker-cluster>
      </template>
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