<script setup lang="ts">
import {computed, ref} from "vue";
import {PsrAMapContext} from "../plugins/PsrAMapContext.ts";

const props = withDefaults(defineProps<{
  mapViewMode?: '2D' | '3D',
  mapLogo?: boolean,
}>(), {
  mapViewMode: '2D',
  mapLogo: true,
})

const containerRef = ref<HTMLDivElement>()

const map = PsrAMapContext.useMap(containerRef, computed(() => ({
  viewMode: props.mapViewMode
})))
</script>

<template>
  <div>
    <div style="height: 100%;width: 100%;" :class="{'hide-logo':!mapLogo}" ref="containerRef">
      <slot :map="map"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
<style lang="scss">
.hide-logo {
  .amap-logo {
    display: none !important;
  }

  .amap-copyright {
    opacity: 0 !important;
  }
}
</style>
