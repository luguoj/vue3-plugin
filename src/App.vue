<script setup lang="ts">
import {PsrVue3AMap} from "./components";</script>

<template>
  <div class="ct-root">
    <psr-vue3-a-map class="map" :message="'abc'"/>
  </div>
</template>

<style scoped lang="scss">
.ct-root {
  width: 100%;
  height: 100%;
  border: 1px solid;
}

.map {
  height: 500px;
}
</style>
