<template>
  <div style="display:none;">
    <teleport
        v-for="markerData in renderMarkerDataRef"
        :key="markerData.amapId"
        :to="markerData.dom"
    >
      <div style="width: fit-content;  height: fit-content;">
        <slot name="marker" :data="markerData.data" :position="markerData.position" :weight="markerData.weight"/>
      </div>
    </teleport>
    <teleport
        v-for="clusterMarkerData in renderClusterMarkerDataRef"
        :key="clusterMarkerData.amapId"
        :to="clusterMarkerData.dom"
    >
      <div style="width: fit-content;  height: fit-content;">
        <slot name="cluster-marker" :count="clusterMarkerData.count"
              :cluster-options="clusterMarkerData.clusterOptions"/>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts" generic="T">
import {computed, onUnmounted, watchEffect} from "vue";
import {PsrAMapContext} from "../../plugins/PsrAMapContext";
import {PsrAMapTypes} from "../../types/PsrAMapTypes";
import {useRenderClusterMarker, useRenderMarker} from "./services";

const props = withDefaults(defineProps<{
  // 地图实例对象
  aMap: AMap.Map
  // 聚合点数据
  clusterData: PsrAMapTypes.ClusterMarkerData<T>[]
  // 聚合计算时网格的像素大小
  clusterGridSize?: number
  // 最大的聚合级别，大于该级别就不进行相应的聚合
  clusterMaxZoom?: number
  // 聚合点的图标位置是否是所有聚合内点的中心点。
  // 数据中如果含有权重值，以权重高的点为中心进行聚合。
  clusterAverageCenter?: boolean
  // 地图缩放过程中是否聚合
  clusterByZoomChange?: boolean
  // 指定聚合后的点标记的图标样式;
  // 数据元素分别对应聚合量在1-10,11-100,101-1000…的聚合点的样式;
  // 当用户设置聚合样式少于实际叠加的点数，未设置部分按照系统默认样式显示;
  clusterStyles?: AMap.MarkerCluster.Style[]
  // 自定义非聚合点标记
  clusterCustomMarker?: boolean
  // 自定义聚合点标记
  clusterCustomClusterMarker?: boolean
}>(), {
  clusterGridSize: 60,
  clusterMaxZoom: 18,
  clusterAverageCenter: true,
  clusterByZoomChange: false,
  clusterCustomMarker: false,
  clusterCustomClusterMarker: false
})

const clusterDataOptions = computed<AMap.MarkerCluster.DataOptions[]>(() => {
  return props.clusterData.map(datum => ({
    weight: datum.weight,
    lnglat: [datum.position.lng, datum.position.lat],
    rawOptions: datum
  } as AMap.MarkerCluster.DataOptions))
})

// 点标记渲染
const {
  renderMarker,
  renderMarkerDataRef
} = useRenderMarker<T>()

// 聚合点标记渲染
const {
  renderClusterMarker,
  renderClusterMarkerDataRef
} = useRenderClusterMarker()

// 点标记聚合实例对象引用
const markerCluster = PsrAMapContext.useMarkerCluster({
  map: props.aMap,
  dataOptions: clusterDataOptions.value,
  opts: {
    gridSize: props.clusterGridSize,
    maxZoom: props.clusterMaxZoom,
    averageCenter: props.clusterAverageCenter,
    clusterByZoomChange: props.clusterByZoomChange,
    styles: props.clusterStyles,
    renderMarker: props.clusterCustomMarker ? renderMarker : undefined,
    renderClusterMarker: props.clusterCustomClusterMarker ? renderClusterMarker : undefined
  }
})

// 更新聚合点数据
watchEffect(() => {
  markerCluster.value?.setData(clusterDataOptions.value)
})

onUnmounted(() => {
  if (markerCluster.value) {
    markerCluster.value.setData([])
  }
})
</script>

<style scoped lang="scss">
.ct-marker-content {
  width: 0;
  height: 0;
}

.ct-marker-content-inner {
  width: fit-content;
  height: fit-content;
  transform: translateX(-50%) translateY(-100%);
}
</style>