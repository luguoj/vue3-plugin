<script setup lang="ts">
import {PsrAMapTypes} from "../../types/PsrAMapTypes";
import {
  useAMapCenterService,
  useAMapOptionsService,
  useAMapPitchService,
  useAMapRotationService,
  useAMapZoomService
} from "./services";
import {computed, ref} from "vue";
import {PsrAMapContext} from "../../plugins";

const props = withDefaults(defineProps<{
  // 地图视图模式
  mapViewMode?: '2D' | '3D'
  // 地图是否展示地形
  mapTerrain?: boolean
  // 地图上显示的元素种类
  mapFeatures?: AMap.Map.Feature[]
  // 地图显示的缩放级别范围
  mapZoomRange?: [number, number]
  // 地图是否可通过鼠标拖拽平移
  mapDragEnable?: boolean
  // 地图是否可缩放
  mapZoomEnable?: boolean
  // 地图是否使用缓动效果
  mapJogEnable?: boolean
  // 是否允许设置俯仰角度
  mapPitchEnable?: boolean
  // 地图是否可旋转
  mapRotateEnable?: boolean
  // 地图平移过程中是否使用动画
  mapAnimateEnable?: boolean
  // 地图是否可通过键盘控制
  mapKeyboardEnable?: boolean
  // 地图是否可通过双击鼠标放大地图
  mapDoubleClickZoom?: boolean
  // 地图是否可通过鼠标滚轮缩放浏览
  mapScrollWheel?: boolean
  // 地图在移动终端上是否可通过多点触控缩放浏览地图
  mapTouchZoom?: boolean
  // 手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心
  mapTouchZoomCenter?: boolean
  // 是否展示地图文字和 POI 信息
  mapShowLabel?: boolean
  // 地图默认鼠标样式
  mapDefaultCursor?: string
  // 是否开启地图热点和标注的 hover 效果
  mapIsHotspot?: boolean
  // 设置地图的显示样式
  mapStyle?: string
  // 地图楼块的侧面颜色
  mapWallColor?: string | number[]
  // 地图楼块的顶面颜色
  mapRoofColor?: string | number[]
  // 是否展示地图 3D 楼块
  mapShowBuildingBlock?: boolean
  // 是否自动展示室内地图
  mapShowIndoorMap?: boolean
  // 天空颜色
  mapSkyColor?: string | number[]
  // 文字是否拒绝掩模图层进行掩模
  mapLabelRejectMask?: boolean
  // 为 Map 实例指定掩模的路径，各图层将只显示路径范围内图像
  // 一维数组时代表一个普通多边形路径
  // 二维数组时代表一个带洞的多边形路径
  // 三维数组时代表多个多边形路径
  mapMask?: [number, number][] | [number, number][][] | [number, number][][][]
  mapMoveImmediately?: boolean
  mapMoveDuration?: number
  mapLogo?: boolean
}>(), {
  mapViewMode: '2D',
  mapTerrain: false,
  mapFeatures: () => (['bg', 'point', 'road', 'building']),
  mapZoomRange: () => ([2, 20]),
  mapDragEnable: true,
  mapZoomEnable: true,
  mapJogEnable: true,
  mapPitchEnable: true,
  mapRotateEnable: true,
  mapAnimateEnable: true,
  mapKeyboardEnable: true,
  mapDoubleClickZoom: true,
  mapScrollWheel: true,
  mapTouchZoom: true,
  mapTouchZoomCenter: true,
  mapShowLabel: true,
  mapIsHotspot: true,
  mapShowBuildingBlock: undefined,
  mapShowIndoorMap: false,
  mapLabelRejectMask: false,
  mapMoveImmediately: false,
  mapLogo: true,
})
// 地图中心经纬度
const centerModel = defineModel<PsrAMapTypes.LngLat>("mapCenter")
// 地图缩放级别
const zoomModel = defineModel<number>("mapZoom")
// 地图顺时针旋转的角度
const rotationModel = defineModel<number>("mapRotation", {default: 0})
// 地图俯仰角度
const pitchModel = defineModel<number>("mapPitch", {default: 0})

// 初始化
const containerRef = ref<HTMLDivElement>()
const mapRef = PsrAMapContext.useMap(
    containerRef,
    computed(() => ({
      viewMode: props.mapViewMode,
      terrain: props.mapTerrain,
      touchZoomCenter: props.mapTouchZoomCenter ? 1 : 0,
      wallColor: props.mapWallColor,
      roofColor: props.mapRoofColor,
      showBuildingBlock: props.mapShowBuildingBlock,
      showIndoorMap: props.mapShowIndoorMap,
      skyColor: props.mapSkyColor
    } as PsrAMapTypes.MapInitOptions)),
    () => ({
      center: centerModel.value ? [centerModel.value.lng, centerModel.value.lat] : undefined,
      zoom: zoomModel.value ? zoomModel.value : undefined,
      rotation: rotationModel.value ? rotationModel.value : undefined,
      pitch: pitchModel.value ? pitchModel.value : undefined,
      features: props.mapFeatures,
      zooms: props.mapZoomRange,
      dragEnable: props.mapDragEnable,
      zoomEnable: props.mapZoomEnable,
      jogEnable: props.mapJogEnable,
      pitchEnable: props.mapPitchEnable,
      rotateEnable: props.mapRotateEnable,
      animateEnable: props.mapAnimateEnable,
      keyboardEnable: props.mapKeyboardEnable,
      doubleClickZoom: props.mapDoubleClickZoom,
      scrollWheel: props.mapScrollWheel,
      touchZoom: props.mapTouchZoom,
      showLabel: props.mapShowLabel,
      defaultCursor: props.mapDefaultCursor,
      isHotspot: props.mapIsHotspot,
      mapStyle: props.mapStyle,
      labelRejectMask: props.mapLabelRejectMask,
      mask: props.mapMask,
    })
)

// 移动中标识
const movingFlagModel = defineModel<boolean>("mapMovingFlag", {default: false})
movingFlagModel.value = false
// 中心点
useAMapCenterService(mapRef, props, centerModel, movingFlagModel)
// 缩放中标识
const zoomingFlagModel = defineModel<boolean>("mapZoomingFlag", {default: false})
zoomingFlagModel.value = false
// 缩放等级
useAMapZoomService(mapRef, props, zoomModel, zoomingFlagModel)
// 旋转中标识
const rotatingFlagModel = defineModel<boolean>("mapRotatingFlag", {default: false})
rotatingFlagModel.value = false
// 旋转
useAMapRotationService(mapRef, props, rotationModel, rotatingFlagModel)
// 俯仰变化标识
const pitchingFlagModel = defineModel<boolean>("mapPitchingFlag", {default: false})
pitchingFlagModel.value = false
// 俯仰角度
useAMapPitchService(mapRef, props, pitchModel, pitchingFlagModel)
// 地图其他选项
useAMapOptionsService(mapRef, props)
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
