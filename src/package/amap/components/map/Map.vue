<script lang="ts">
export default {
  name: 'PsrVue3AMap'
}

export interface PsrVue3AMapExpose {
  map: AMap.Map
}
</script>
<script setup lang="ts">

import {defineExpose, watchEffect} from "vue";
import {useAMap} from "../../services/useAMap";

const props = withDefaults(defineProps<{
  mapKey: string,
  mapLogo: boolean,
  mapCenter: { lng: number, lat: number },
  mapZoom: number
}>(), {
  mapLogo: true,
  mapZoom: 5
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

defineExpose({
  map
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
