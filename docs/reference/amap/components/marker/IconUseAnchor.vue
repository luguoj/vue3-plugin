<script setup lang="ts">
import {PsrAMap, PsrAMapMarker, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const pos = ref<PsrAMapTypes.LngLat>({lng: 116.397428, lat: 39.90923})
</script>

<template>
  <div style="height: 400px;">
    <psr-a-map
        style="height: 100%;"
        :map-center="{lng:116.397428,lat:39.90923}"
    >
      <template #default="{map}">
        <psr-a-map-marker
            :a-map="map"
            v-model:marker-position="pos"
            marker-icon="https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
            marker-anchor="bottom-center"
            marker-draggable
        />
      </template>
    </psr-a-map>
  </div>
</template>