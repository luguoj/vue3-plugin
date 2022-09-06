<script lang="ts">
export default {
  name: 'PsrVue3AMap'
}
</script>
<script setup lang="ts">

import {watchEffect} from "vue";
import {useAMap} from "../services/useAMap";

const props = withDefaults(defineProps<{
  mapKey: string,
  mapLogo: boolean,
  mapCenter: { lng: number, lat: number },
  mapZoom: number,
  mapLayerBuildings: boolean
}>(), {
  mapLogo: true,
  mapZoom: 5,
  mapLayerBuildings: false
})

const {container, map} = useAMap({key: props.mapKey})

watchEffect(() => {
  if (map.value && props.mapCenter) {
    map.value.setCenter(new AMap.LngLat(props.mapCenter.lng, props.mapCenter.lat))
  }
})

watchEffect(() => {
  if (map.value) {
    map.value.setZoom(props.mapZoom)
  }
})

let buildingsLayer: AMap.Buildings | null

watchEffect(() => {
  if (map.value) {
    if (props.mapLayerBuildings) {
      if (!buildingsLayer) {
        buildingsLayer = new AMap.Buildings({
          heightFactor: 1,
          wallColor: 'rgba(255,0,0,1)',
          roofColor: 'rgba(0,0,255,0.5)',
        })
        map.value.addLayer(buildingsLayer)
      }
    } else {
      if (buildingsLayer) {
        map.value.removeLayer(buildingsLayer)
        buildingsLayer = null
      }
    }
  }
})
</script>

<template>
  <div class="ct-root" :class="{'hide-logo':!mapLogo}" ref="container">
    <slot :map="map"/>
  </div>
</template>

<style lang="scss" scoped>
.ct-root {
  height: 100%;
  width: 100%;
}
</style>
<style lang="scss">
.hide-logo {
  .amap-logo {
    display: none !important;
  }

  .amap-copyright {
    opacity: 0 !important;
  }
}
</style>
