<template>

</template>

<script lang="ts">
export default {
  name: "PsrVue3AMapMarker"
}
</script>
<script setup lang="ts">
import {shallowRef, ShallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  markerMap: AMap.Map,
  markerPosition: { lng: number, lat: number },
  markerTitle?: string,
}>(), {})

const marker: ShallowRef<AMap.Marker | undefined> = shallowRef()

watch(() => props.markerMap, (map) => {
  if (map) {
    marker.value = new AMap.Marker({
      position: new AMap.LngLat(props.markerPosition.lng, props.markerPosition.lat),
      title: props.markerTitle
    })
    map.add(marker.value)
  }
}, {immediate: true})

watchEffect(() => {
  if (marker.value) {
    marker.value.setPosition(new AMap.LngLat(props.markerPosition.lng, props.markerPosition.lat))
  }
})

watchEffect(() => {
  if (marker.value) {
    marker.value.setTitle(props.markerTitle)
  }
})
</script>

<style scoped>

</style>