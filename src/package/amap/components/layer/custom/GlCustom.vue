<script setup lang="ts">
import {watchEffect} from "vue";
import {PsrAMapContext} from "../../../plugins/PsrAMapContext.ts";

const props = withDefaults(defineProps<{
  // 地图实例对象
  aMap: AMap.Map
  // 图层缩放等级范围
  layerZoomRange?: [number, number]
  // 图层透明度
  layerOpacity?: number
  // 图层是否可见
  layerVisible?: boolean
  // 图层层级
  layerZIndex?: number
}>(), {
  layerZoomRange: () => ([2, 20]),
  layerOpacity: 1,
  layerVisible: true,
  layerZIndex: 11,
})

const emits = defineEmits<{
  (e: 'layer-init', event: { map: AMap.Map, layer: AMap.GLCustomLayer, gl: WebGLRenderingContext }): void
  (e: 'layer-render', event: { map: AMap.Map, layer: AMap.GLCustomLayer, gl: WebGLRenderingContext, state: any }): void
}>()

const layerRef = PsrAMapContext.useGLCustomLayer(
    {
      zooms: props.layerZoomRange,
      opacity: props.layerOpacity,
      visible: props.layerVisible,
      zIndex: props.layerZIndex,
      init: (gl) => {
        emits('layer-init', {map: props.aMap, layer: layerRef.value!, gl})
      },
      render: (gl, state) => {
        emits('layer-render', {map: props.aMap, layer: layerRef.value!, gl, state})
      }
    })

// 监听图层实例对象，（重新）绘制图层
watchEffect(() => {
  if (layerRef.value) {
    // 将图层添加到地图
    props.aMap.addLayer(layerRef.value)
  }
})
</script>

<template>

</template>