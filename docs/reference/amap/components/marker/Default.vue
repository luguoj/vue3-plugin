<script setup lang="ts">
import {PsrAMap, PsrAMapMarker, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const visible = ref(true)
const draggable = ref(false)

const pos = ref<PsrAMapTypes.LngLat>({lng: 116.397428, lat: 39.90923})
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="visible=!visible">开/关点标记: {{ visible }}</button>
    <button class="el-button" @click="draggable=!draggable;">开/关拖拽: {{ draggable }}</button>
    <psr-a-map
        style="height: 100%;"
        :map-center="{lng:116.397428,lat:39.90923}"
    >
      <template #default="{map}">
        <psr-a-map-marker
            :a-map="map"
            v-model:marker-position="pos"
            :marker-visible="visible"
            marker-title="鼠标文字提示"
            :marker-draggable="draggable"
            :marker-label="`标签 - lng:${pos?.lng||'?'},lat:${pos?.lat||'?'}`"
            marker-label-direction="right"
            :marker-label-offset="{x:10,y:0}"
        />
      </template>
    </psr-a-map>
  </div>
</template>