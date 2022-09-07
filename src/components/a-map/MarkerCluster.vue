<template>
  <div style="display:none;">
    <div v-for="markerDatum in clusterDataWithId" class="ct-marker-content" :class="`marker-${markerDatum.markerId}`" ref="customMarkerRef">
      <div class="ct-marker-content-inner">
        <slot name="marker" :data="markerDatum"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PsrVue3AMapMarkerCluster"
}
</script>
<script setup lang="ts">
import {computed, onUnmounted, ref, Ref, shallowRef, ShallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  markerMap?: AMap.Map
  clusterData: AMap.MarkerCluster.DataOptions[]
  clusterGridSize?: number,
  clusterMaxZoom?: number
  clusterAverageCenter?: boolean
  clusterStyles?: AMap.MarkerCluster.Style[]
  clusterCustomMarker?: boolean
}>(), {
  clusterGridSize: 60,
  clusterMaxZoom: 18,
  clusterAverageCenter: true,
  clusterCustomMarker: false
})
const clusterDataWithId = computed(() => {
  const _clusterDataWithId: AMap.MarkerCluster.DataOptions[] = []
  for (let i = 0; i < props.clusterData.length; i++) {
    const clusterDatum = props.clusterData[i];
    _clusterDataWithId.push({
      ...clusterDatum,
      markerId: i
    })
  }
  return _clusterDataWithId
})

const customMarkerRef: Ref<HTMLElement[] | undefined> = ref()

const markerCluster: ShallowRef<AMap.MarkerCluster | undefined> = shallowRef()
watch(() => props.markerMap, (map) => {
  if (map) {
    map.plugin(['AMap.MarkerCluster'], () => {
      markerCluster.value = new AMap.MarkerCluster(map,
          [],
          {
            gridSize: props.clusterGridSize,
            maxZoom: props.clusterMaxZoom,
            averageCenter: props.clusterAverageCenter,
            styles: props.clusterStyles,
            renderMarker: (data: AMap.MarkerCluster.RenderMarkerData) => {
              if (props.clusterCustomMarker) {
                const customMarker = customMarkerRef.value?.find(el => el.className === `ct-marker-content marker-${data.data[0].markerId}`)
                if (customMarker) {
                  data.marker.setContent(customMarker)
                }
              }
            }
          })
    })
  }
}, {immediate: true})

watchEffect(() => {
  if (props.markerMap && clusterDataWithId.value) {
    markerCluster.value?.setData(clusterDataWithId.value)
  }
})

onUnmounted(() => {
  if (markerCluster.value && props.markerMap) {
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