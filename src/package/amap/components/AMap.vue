<script setup lang="ts">
import {computed, ref} from "vue";
import {PsrAMapContext} from "../plugins/PsrAMapContext.ts";
import {PsrAMapTypes} from "../types/PsrAMapTypes";
import {useAMapCenterService} from "./useAMapCenterService.ts";

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

// 初始化地图
const containerRef = ref<HTMLDivElement>()
const mapRef = PsrAMapContext.useMap(containerRef, computed(() => ({
  viewMode: props.mapViewMode
})))

// 地图中心点
const centerModel = defineModel<PsrAMapTypes.LngLat>("mapCenter")

useAMapCenterService(mapRef, props, centerModel)
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
