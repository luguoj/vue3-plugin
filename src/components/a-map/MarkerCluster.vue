<template>
</template>

<script lang="ts">
export default {
  name: "PsrVue3AMapMarkerCluster"
}
</script>
<script setup lang="ts">
import {onUnmounted, shallowRef, ShallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  markerMap?: AMap.Map
  clusterData: AMap.MarkerCluster.DataOptions[]
  clusterGridSize?: number,
  clusterMaxZoom?: number
  clusterAverageCenter?: boolean
  clusterStyles?: AMap.MarkerCluster.Style[]
  clusterRenderClusterMarker?: (data: AMap.MarkerCluster.RenderClusterMarkerData) => void
  clusterRenderMarker?: (data: AMap.MarkerCluster.RenderMarkerData) => void
}>(), {
  clusterGridSize: 60,
  clusterMaxZoom: 18,
  clusterAverageCenter: true,

})
const markerCluster: ShallowRef<AMap.MarkerCluster | undefined> = shallowRef()
watch(() => props.markerMap, (map) => {
  if (map) {
    map.plugin(['AMap.MarkerCluster'], () => {
      markerCluster.value = new AMap.MarkerCluster(map,
          props.clusterData,
          {
            gridSize: props.clusterGridSize,
            maxZoom: props.clusterMaxZoom,
            averageCenter: props.clusterAverageCenter,
            styles: props.clusterStyles,
            renderMarker: props.clusterRenderMarker,
            renderClusterMarker: props.clusterRenderClusterMarker
          })
    })
  }
}, {immediate: true})

watchEffect(() => {
  if (props.markerMap && props.clusterData) {
    markerCluster.value?.setData(props.clusterData)
  }
})

onUnmounted(() => {
  if (markerCluster.value && props.markerMap) {
    markerCluster.value.setData([])
  }
})
</script>

<style scoped lang="scss">
.ct-content {
  width: 0;
  height: 0;
}

.ct-content-inner {
  width: fit-content;
  height: fit-content;
  transform: translateX(-50%) translateY(-100%);
}
</style>