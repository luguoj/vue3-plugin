<template>
  <div style="display:none;">
    <div
        v-if="clusterCustomMarker"
        v-for="markerData in clusterDataWithId" :key="markerData.markerId"
        style="width: fit-content;  height: fit-content;"
        :marker-id="markerData.markerId"
        ref="contentRef"
    >
      <slot name="marker" :marker-data="markerData"/>
    </div>
    <teleport
        v-for="clusterMarkerData in validRenderClusterMarkerDataRef" :key="clusterMarkerData.markerId"
        :to="clusterMarkerData.dom"
    >
      <div style="width: fit-content;  height: fit-content;">
        <slot name="cluster-marker" :cluster-marker-data="clusterMarkerData"/>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import {computed, markRaw, onUnmounted, reactive, ref, Ref, watchEffect} from "vue";
import {PsrAMapContext} from "../../plugins/PsrAMapContext.ts";

const props = withDefaults(defineProps<{
  // 地图实例对象
  aMap: AMap.Map
  // 聚合点数据
  clusterData: AMap.MarkerCluster.DataOptions[]
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

// 给数据附加序号ID
const clusterDataWithId = computed(() => {
  const _clusterDataWithId: AMap.MarkerCluster.DataOptions[] = []
  for (let i = 0; i < props.clusterData.length; i++) {
    const clusterDatum = props.clusterData[i];
    _clusterDataWithId.push({
      ...clusterDatum,
      markerId: i + ''
    })
  }
  return _clusterDataWithId
})

type RenderClusterMarkerData = {
  markerId: string
  dom: HTMLElement,
  data: AMap.MarkerCluster.RenderClusterMarkerData
}

const renderClusterMarkerDataRef = ref<RenderClusterMarkerData[]>([])
const validRenderClusterMarkerDataRef = computed(() =>
    renderClusterMarkerDataRef.value.filter(item => item.data.marker.getMap())
)
const renderClusterMarkerDataById: Record<string, RenderClusterMarkerData> = {}
// 点标记聚合实例对象引用
const markerCluster = PsrAMapContext.useMarkerCluster({
  map: props.aMap,
  dataOptions: props.clusterData,
  opts: {
    gridSize: props.clusterGridSize,
    maxZoom: props.clusterMaxZoom,
    averageCenter: props.clusterAverageCenter,
    clusterByZoomChange: props.clusterByZoomChange,
    styles: props.clusterStyles,
    renderMarker: props.clusterCustomMarker ? (data: AMap.MarkerCluster.RenderMarkerData) => {
      const customMarker = contentsRef.value?.find(el => el.getAttribute('marker-id') === data.data[0].markerId)
      if (customMarker) {
        data.marker.setContent(customMarker)
      }
    } : undefined,
    // renderClusterMarker: props.clusterCustomClusterMarker ? (data: AMap.MarkerCluster.RenderClusterMarkerData) => {
    // } : undefined,
    renderClusterMarker: (data: AMap.MarkerCluster.RenderClusterMarkerData) => {
      // 添加新的聚合点标记数据引用
      const _marker = data.marker as any
      const markerId = _marker._amap_id + ''
      const dom = _marker.dom
      if (!renderClusterMarkerDataById[markerId]) {
        const newData = reactive({
          markerId,
          dom: markRaw(dom),
          data: markRaw(data)
        })
        renderClusterMarkerDataById[markerId] = newData
        renderClusterMarkerDataRef.value.push(newData)
      } else {
        renderClusterMarkerDataById[markerId].dom = markRaw(dom)
      }
    },
  }
})
// 未聚合点标记内容元素引用
const contentsRef: Ref<HTMLElement[] | undefined> = ref()

// 更新聚合点数据
watchEffect(() => {
  if (clusterDataWithId.value) {
    markerCluster.value?.setData(clusterDataWithId.value)
  }
})

onUnmounted(() => {
  if (markerCluster.value && props.aMap) {
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