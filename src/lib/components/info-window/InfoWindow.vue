<template>
  <div class="ct-root">
    <div class="ct-content-inner" ref="contentRef">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PsrVue3AMapInfoWindow"
}
</script>
<script setup lang="ts">

import {defineEmits, onUnmounted, onUpdated, ref, shallowRef, watch, watchEffect} from "vue";

const props = withDefaults(defineProps<{
  aMap?: AMap.Map,
  infoWindowCustom?: boolean,
  infoWindowVisible?: boolean,
  infoWindowPosition?: AMap.LocationValue
}>(), {
  infoWindowCustom: false,
  infoWindowVisible: true
})

const emits = defineEmits<{
  (e: 'update:infoWindowVisible', visible: boolean): void
}>()

const infoWindow = shallowRef<AMap.InfoWindow>()
const contentRef = ref<HTMLElement>()

watch(() => props.aMap, (map) => {
  if (map) {
    infoWindow.value = new AMap.InfoWindow({
      isCustom: props.infoWindowCustom
    })
    infoWindow.value.on('close', () => {
      emits('update:infoWindowVisible', false)
    })
  }
}, {immediate: true})

watchEffect(() => {
  if (infoWindow.value && contentRef.value) {
    infoWindow.value.setContent(contentRef.value)
  }
})

watchEffect(() => {
  if (infoWindow.value && props.aMap) {
    if (props.infoWindowVisible) {
      infoWindow.value.open(props.aMap, props.infoWindowPosition || props.aMap.getCenter())
    } else {
      infoWindow.value.close()
    }
  }
})

onUpdated(() => {
  if (infoWindow.value && contentRef.value) {
    infoWindow.value.setContent(contentRef.value)
  }
})

onUnmounted(() => {
  if (infoWindow.value && props.aMap) {
    infoWindow.value.close()
  }
})

defineExpose({
  infoWindow
})
</script>

<style scoped lang="scss">
.ct-root {
  display: none;
}
</style>