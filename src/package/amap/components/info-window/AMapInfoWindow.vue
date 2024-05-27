<template>
  <div style="display: none">
    <div ref="contentRef">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, onUpdated, ref, watch, watchEffect} from "vue";
import {PsrAMapTypes} from "../../types/PsrAMapTypes.ts";
import {PsrAMapContext} from "../../plugins";

const props = withDefaults(defineProps<{
  aMap: AMap.Map, // 地图实例对象
  infoWindowCustom?: boolean, // 是否自定义消息窗体
  infoWindowPosition?: PsrAMapTypes.LngLat // 消息窗体显示基点位置
}>(), {
  infoWindowCustom: false,
})

// 消息窗体可见性
const visible = defineModel<boolean>("infoWindowVisible", {default: true})
// 消息窗体实例对象引用
const infoWindowRef = PsrAMapContext.useInfoWindow({
  isCustom: props.infoWindowCustom
})
// 消息窗体自定义内容元素引用
const contentRef = ref<HTMLElement>()

// 监听关闭事件（用户点击信息窗体上的关闭按钮），设置可见性
watch(infoWindowRef, infoWindow => {
  if (infoWindow) {
    infoWindow.on('close', () => {
      visible.value = false
    })
  }
}, {immediate: true})

// 设置内容
watchEffect(() => {
  if (infoWindowRef.value && contentRef.value) {
    infoWindowRef.value.setContent(contentRef.value)
  }
})

// 更新信息窗内容
onUpdated(() => {
  if (infoWindowRef.value && contentRef.value) {
    infoWindowRef.value.setContent(contentRef.value)
  }
})


// 监听消息窗体实例对象，地图实例对象，可见性变化，（重新）绘制消息窗体
watchEffect(() => {
  if (infoWindowRef.value) {
    // 如果消息窗体已经打开，则关闭现有窗体
    if (infoWindowRef.value.getIsOpen()) {
      infoWindowRef.value.close()
    }
    if (visible.value) { // 如果可见则在新地图实例打开消息窗体
      infoWindowRef.value.open(props.aMap, props.infoWindowPosition ? [props.infoWindowPosition.lng, props.infoWindowPosition.lat] : props.aMap.getCenter())
    }
  }
})

// 组件卸载时关闭消息窗体
onUnmounted(() => {
  if (infoWindowRef.value && props.aMap) {
    infoWindowRef.value.close()
  }
})
</script>