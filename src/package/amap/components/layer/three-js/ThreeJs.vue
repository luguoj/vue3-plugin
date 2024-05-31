<script setup lang="ts">
import {onMounted, shallowRef} from "vue";
import {PsrAMapGlCustomLayer} from "../custom"
import {ThreeJsContext} from "./services/ThreeJsContext.ts";
import {PsrAMapTypes} from "../../../types/PsrAMapTypes.ts";

const props = withDefaults(defineProps<{
  // 地图实例对象
  aMap: AMap.Map,
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
  (e: 'three-js-ready', params: PsrAMapTypes.ThreeJsLayer.OnReadyParams): void
}>()

const threeJs = shallowRef<ThreeJsContext>()

onMounted(() => {
  import("three162").then(THREE => {
    threeJs.value = ThreeJsContext.create({
      amap: props.aMap,
      THREE,
      onReady: (params) => {
        emits('three-js-ready', params)
      }
    })
  })
})
</script>

<template>
  <psr-a-map-gl-custom-layer
      v-if="threeJs"
      :a-map="aMap"
      :layer-visible="layerVisible"
      :layer-opacity="layerOpacity"
      :layer-zoom-range="layerZoomRange"
      :layer-z-index="layerZIndex"
      @layer-init="threeJs.init($event.gl)"
      @layer-render="threeJs.render()"
  />
</template>