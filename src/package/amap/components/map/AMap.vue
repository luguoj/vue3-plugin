<script setup lang="ts">
import {PsrAMapTypes} from "../../types/PsrAMapTypes";
import {
  useAMapCenterService,
  useAMapFeaturesService,
  useAMapPitchService,
  useAMapRotationService,
  useAMapZoomService
} from "./services";
import {computed, ref} from "vue";
import {PsrAMapContext} from "@psr-framework/vue3-plugin";

const props = withDefaults(defineProps<{
  mapViewMode?: '2D' | '3D',
  mapLogo?: boolean,
  mapMoveImmediately?: boolean,
  mapMoveDuration?: number,
  mapZoomRange?: [number, number],
  mapFeatures?: AMap.Map.Feature[]
}>(), {
  mapViewMode: '2D',
  mapLogo: true,
  mapMoveImmediately: false,
  mapZoomRange: () => ([2, 20]),
  mapFeatures: () => (['bg', 'point', 'road', 'building'])
})
// 移动中标识
const movingFlagModel = defineModel<boolean>("mapMovingFlag", {default: false})
movingFlagModel.value = false
// 缩放中标识
const zoomingFlagModel = defineModel<boolean>("mapZoomingFlag", {default: false})
zoomingFlagModel.value = false
// 旋转中标识
const rotatingFlagModel = defineModel<boolean>("mapRotatingFlag", {default: false})
rotatingFlagModel.value = false
// 俯仰变化标识
const pitchingFlagModel = defineModel<boolean>("mapPitchingFlag", {default: false})
pitchingFlagModel.value = false
// 地图中心点
const centerModel = defineModel<PsrAMapTypes.LngLat>("mapCenter")
// 地图缩放等级
const zoomModel = defineModel<number>("mapZoom")
// 地图旋转
const rotationModel = defineModel<number>("mapRotation")
// 俯仰角度
const pitchModel = defineModel<number>("mapPitch")

// 初始化
const containerRef = ref<HTMLDivElement>()
const mapRef = PsrAMapContext.useMap(
    containerRef,
    computed(() => ({
      viewMode: props.mapViewMode
    })),
    () => ({
      center: centerModel.value ? [centerModel.value.lng, centerModel.value.lat] : undefined,
      zoom: zoomModel.value ? zoomModel.value : undefined,
      zooms: props.mapZoomRange,
      rotation: rotationModel.value ? rotationModel.value : undefined,
      pitch: pitchModel.value ? pitchModel.value : undefined,
      features: props.mapFeatures
    })
)

// 中心点
useAMapCenterService(mapRef, props, centerModel, movingFlagModel)
// 缩放等级
useAMapZoomService(mapRef, props, zoomModel, zoomingFlagModel)
// 旋转
useAMapRotationService(mapRef, props, rotationModel, rotatingFlagModel)
// 俯仰角度
useAMapPitchService(mapRef, props, pitchModel, pitchingFlagModel)
// 地图特性
useAMapFeaturesService(mapRef, props)
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
