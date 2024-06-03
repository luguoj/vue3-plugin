<script setup lang="ts">
import {onUnmounted, watchEffect} from "vue";
import {PsrAMapContext} from "../../../plugins/PsrAMapContext.ts";

const props = withDefaults(defineProps<{
  // 地图实例对象
  aMap: AMap.Map
  // 楼块侧面颜色
  buildingsWallColor?: string | string[]
  // 楼块顶面颜色
  buildingsRoofColor?: string | string[]
  // 楼块的高度系数因子
  buildingsHeightFactor?: number
  // 楼块的围栏和样式设置
  buildingsStyleOpts?: AMap.Buildings.StyleOpts,
  // 图层缩放等级范围
  layerZoomRange?: [number, number]
  // 图层透明度
  layerOpacity?: number
  // 图层是否可见
  layerVisible?: boolean
  // 图层层级
  layerZIndex?: number
}>(), {
  buildingsHeightFactor: 1,
  layerZoomRange: () => ([2, 20]),
  layerOpacity: 1,
  layerVisible: true,
  layerZIndex: 11,
})
const buildingsRef = PsrAMapContext.useBuildings({
  wallColor: props.buildingsWallColor,
  roofColor: props.buildingsRoofColor,
  heightFactor: props.buildingsHeightFactor,
  styleOpts: props.buildingsStyleOpts,
  zooms: props.layerZoomRange,
  opacity: props.layerOpacity,
  visible: props.layerVisible,
  zIndex: props.layerZIndex,
})

// 监听建筑图层实例对象，（重新）绘制图层
watchEffect(() => {
  if (buildingsRef.value) {
    // 将图层添加到地图
    props.aMap.addLayer(buildingsRef.value)
  }
})

// 组件卸载时从地图上删除图层并销毁
onUnmounted(() => {
  if (buildingsRef.value) {
    props.aMap.removeLayer(buildingsRef.value)
  }
})

// 更新选项
watchEffect(() => {
  const buildings = buildingsRef.value
  if (buildings) {
    (buildings as any).setStyle(props.buildingsStyleOpts)
    buildings.setZooms(props.layerZoomRange)
    buildings.setOpacity(props.layerOpacity)
    if (props.layerVisible) {
      buildings.show()
    } else {
      buildings.hide()
    }
    buildings.setzIndex(props.layerZIndex)
  }
})
</script>

<template/>