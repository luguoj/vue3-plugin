<script setup lang="ts">
import {PsrAMapContext, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref, watch} from "vue";

// 渲染地图的DIV容器引用
const divRef = ref<HTMLDivElement>()
// 渲染地图参数
const opt = ref<PsrAMapTypes.MapInitOptions>({
  viewMode: '3D'
})

// 可根据地图选项响应式重绘
function switchViewMode() {
  if (opt.value) {
    if (opt.value.viewMode == '3D') {
      opt.value.viewMode = '2D'
    } else {
      opt.value.viewMode = '3D'
    }
  }
}

// 渲染地图
const mapRef = PsrAMapContext.useMap(divRef, opt)

watch(mapRef, map => {
  // 操作地图实例对象
  if (map) {
    map.setZoom(17)
    if (opt.value?.viewMode == '3D') {
      map.setPitch(45)
    }
  }
})
</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="switchViewMode">切换视图模式: {{ opt?.viewMode || '2D' }}</button>
    <div style="height: 100%;" ref="divRef"/>
  </div>
</template>