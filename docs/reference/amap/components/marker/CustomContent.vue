<script setup lang="ts">
import {ref} from "vue";
import {PsrAMap, PsrAMapMarker, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import ContentComponent from "./ContentComponent.vue";

const pos = ref<PsrAMapTypes.LngLat>({lng: 116.397428, lat: 39.90923})
const markerText = ref<string>("自定义点标记")
</script>

<template>
  <div style="height: 400px;">
    <input v-model="markerText"/>
    <psr-a-map
        style="height: 100%;"
        :map-center="{lng:116.397428,lat:39.90923}"
    >
      <template #default="{map}">
        <psr-a-map-marker
            :a-map="map"
            v-model:marker-position="pos"
            marker-draggable
            marker-custom
        >
          <content-component v-model="markerText"/>
        </psr-a-map-marker>
      </template>
    </psr-a-map>
  </div>
</template>