<script setup lang="ts">
import {PsrAMapTypes} from "../../types/PsrAMapTypes";
import {useAMap, useAMapCenterService, useAMapZoomService} from "./services";

const props = withDefaults(defineProps<{
  mapViewMode?: '2D' | '3D',
  mapLogo?: boolean,
  mapMoveImmediately?: boolean,
  mapMoveDuration?: number
}>(), {
  mapViewMode: '2D',
  mapLogo: true,
  mapMoveImmediately: false
})
// 地图中心点
const centerModel = defineModel<PsrAMapTypes.LngLat>("mapCenter")
// 地图缩放等级
const zoomModel = defineModel<number>("mapZoom")

// 初始化
const {containerRef, mapRef} = useAMap(props)
// 中心点
useAMapCenterService(mapRef, props, centerModel)
// 缩放等级
useAMapZoomService(mapRef, props, zoomModel)
</script>

<template>
  <div>
    <div style="width: 100%;height: 100%;position: relative;">
      <div style="height: 100%;width: 100%;position: absolute;" :class="{'hide-logo':!mapLogo}" ref="containerRef"/>
      <div v-if="mapRef" style="height: 100%;width: 100%;position: absolute;pointer-events: none;">
        <slot :map="mapRef"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

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
