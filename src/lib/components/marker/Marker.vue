<template>
  <div class="ct-content" v-if="marker && markerCustom" ref="contentRef">
    <div class="ct-content-inner">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PsrVue3AMapMarker"
}
</script>
<script setup lang="ts">
import {defineExpose, onUnmounted, ref, Ref, shallowRef, ShallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  aMap?: AMap.Map,
  markerPosition: { lng: number, lat: number },
  markerTitle?: string,
  markerVisible?: boolean,
  markerDraggable?: boolean,
  markerLabel?: string,
  markerLabelDirection?: 'top' | 'right' | 'bottom' | 'left' | 'center',
  markerLabelOffset?: AMap.Pixel,
  markerCustom?: boolean
}>(), {
  markerVisible: true,
  markerDraggable: false,
  markerLabelDirection: 'right',
  markerCustom: false
})
const contentRef: Ref<HTMLElement | undefined> = ref()
const marker: ShallowRef<AMap.Marker | undefined> = shallowRef()
watch(() => props.aMap, (map) => {
  if (map) {
    const _marker = new AMap.Marker({
      position: new AMap.LngLat(props.markerPosition.lng, props.markerPosition.lat),
      title: props.markerTitle,
      visible: props.markerVisible,
      draggable: props.markerDraggable,
    })
    map.add(_marker)
    marker.value = _marker
  }
}, {immediate: true})

watchEffect(() => {
  if (marker.value && contentRef.value) {
    marker.value.setContent(contentRef.value)
  }
})

watchEffect(() => {
  if (marker.value) {
    marker.value.setPosition(new AMap.LngLat(props.markerPosition.lng, props.markerPosition.lat))
  }
})

watchEffect(() => {
  if (marker.value) {
    marker.value.setTitle(props.markerTitle || '')
  }
})

watchEffect(() => {
  if (marker.value) {
    if (props.markerVisible) {
      marker.value.show()
    } else {
      marker.value.hide()
    }
  }
})
watchEffect(() => {
  if (marker.value) {
    marker.value.setDraggable(props.markerDraggable)
  }
})
watchEffect(() => {
  if (marker.value) {
    marker.value.setLabel({
      content: props.markerLabel || '',
      offset: props.markerLabelOffset,
      direction: props.markerLabelDirection
    })
  }
})
onUnmounted(() => {
  if (marker.value && props.aMap) {
    props.aMap.remove(marker.value)
  }
})

defineExpose({
  marker
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