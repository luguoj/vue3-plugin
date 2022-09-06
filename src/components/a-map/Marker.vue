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
import {ref, Ref, shallowRef, ShallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  markerMap: AMap.Map,
  markerPosition: { lng: number, lat: number },
  markerTitle?: string,
  markerVisible?: boolean,
  markerCustom?: boolean
}>(), {
  markerVisible: true,
  markerCustom: false
})
const contentRef: Ref<HTMLElement | undefined> = ref()
const marker: ShallowRef<AMap.Marker | undefined> = shallowRef()
watch(() => props.markerMap, (map) => {
  if (map) {
    const _marker = new AMap.Marker({
      position: new AMap.LngLat(props.markerPosition.lng, props.markerPosition.lat),
      title: props.markerTitle
    })
    map.add(_marker)
    marker.value = _marker
  }
}, {immediate: true})

watch(contentRef, content => {
  if (marker.value) {
    marker.value.setContent(content)
  }
})

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

watchEffect(() => {
  if (marker.value) {
    if (props.markerVisible) {
      marker.value.show()
    } else {
      marker.value.hide()
    }
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