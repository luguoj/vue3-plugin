<script setup lang="ts">
import {PsrAMap, PsrAMapMarkerCluster, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";
import ContentComponent from "../marker/ContentComponent.vue";

type DataOptions = PsrAMapTypes.ClusterMarkerData<{ title: string }>

const markerCluster = ref<DataOptions[]>([])
let i = 0
let timer = setInterval(() => {
  markerCluster.value.push({
    weight: 1,
    position: {
      lng: 116.397428 + Math.random() * 0.002 - 0.001,
      lat: 39.90923 + Math.random() * 0.002 - 0.001
    },
    data: {
      title: 'title-' + i
    }
  })
  if (i++ > 100) {
    clearInterval(timer)
  }
}, 50)
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
            cluster-custom-marker
            cluster-custom-cluster-marker
        >
          <template #marker="{data}">
            <content-component :model-value="`${data?.title}`" style="transform:translateX(-50%) translateY(-100%)"/>
          </template>
          <template #cluster-marker="{count}">
            <div>{{ count }}</div>
          </template>
        </psr-a-map-marker-cluster>
      </template>
    </psr-a-map>
  </div>
</template>