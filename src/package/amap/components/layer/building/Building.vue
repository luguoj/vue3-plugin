<script lang="ts">
export default {
  name: "PsrVue3AMapLayerBuilding"
}
</script>
<script setup lang="ts">
import {defineExpose, onUnmounted, shallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  aMap?: AMap.Map,
  buildingsWallColor?: string | string[],
  buildingsRoofColor?: string | string[],
  buildingsOpacity?: number,
  buildingsZoomMin?: number,
  buildingsZoomMax?: number,
  buildingsVisible?: boolean
}>(), {
  buildingsOpacity: 1,
  buildingsZoomMin: 2,
  buildingsZoomMax: 20,
  buildingsVisible: true
})
const buildings = shallowRef<AMap.Buildings>()

watch(() => props.aMap, (map) => {
  if (map) {
    buildings.value = new AMap.Buildings({
      heightFactor: 1,
      wallColor: props.buildingsWallColor,
      roofColor: props.buildingsRoofColor,
      opacity: props.buildingsOpacity,
      zooms: [props.buildingsZoomMin, props.buildingsZoomMax]
    })
    map.addLayer(buildings.value)
  }
}, {immediate: true})

watchEffect(() => {
  buildings.value?.setOpacity(props.buildingsOpacity)
})
watchEffect(() => {
  buildings.value?.setZooms([props.buildingsZoomMin, props.buildingsZoomMax])
})
watch(() => props.buildingsVisible, visible => {
  if (buildings.value) {
    if (visible) {
      buildings.value.show()
    } else {
      buildings.value.hide()
    }
  }
})
onUnmounted(() => {
  if (buildings.value && props.aMap) {
    props.aMap.removeLayer(buildings.value)
    buildings.value.destroy()
  }
})

defineExpose({
  buildings
})
</script>
<template>

</template>
<style scoped>

</style>