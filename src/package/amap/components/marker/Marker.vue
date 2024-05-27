<template>
  <div style="display: none">
    <div style="width: fit-content;  height: fit-content;  transform: translateX(-50%) translateY(-100%);"
         ref="contentRef">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onUnmounted, ref, Ref, ShallowRef, watch, watchEffect} from "vue";
import {PsrAMapTypes} from "../../types/PsrAMapTypes.ts";
import {PsrAMapContext} from "../../plugins";

const props = withDefaults(defineProps<{
  aMap: AMap.Map, // 地图实例对象
  markerIcon?: string, // 在点标记中显示的图标地址
  markerTitle?: string, // 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
  markerVisible?: boolean, // 点标记是否可见
  markerDraggable?: boolean, // 设置点标记是否可拖拽移动
  markerLabel?: string, // 添加文本标注内容
  markerLabelDirection?: 'top' | 'right' | 'bottom' | 'left' | 'center', // 文本标注方位
  markerLabelOffset?: PsrAMapTypes.Pixel, // 文本标注偏移量。如设置了 direction，以 direction 方位为基准点进行偏移。
  markerCustom?: boolean // 是否使用自定义内容作为点标记图标
}>(), {
  markerVisible: true,
  markerDraggable: false,
  markerLabelDirection: 'right',
  markerCustom: false
})

// 点标记在地图上显示的位置
const position = defineModel<PsrAMapTypes.LngLat>("markerPosition")

// 点标记实例对象引用
const markerRef: ShallowRef<AMap.Marker | undefined> = PsrAMapContext.useMarker({
  position: position.value && [position.value.lng, position.value.lat],
  icon: props.markerIcon,
  title: props.markerTitle,
  visible: props.markerVisible,
  draggable: props.markerDraggable
})
// 自定义内容元素引用
const contentRef: Ref<HTMLElement | undefined> = ref()

// 设置内容
watchEffect(() => {
  if (markerRef.value && contentRef.value && props.markerCustom) {
    markerRef.value.setContent(contentRef.value)
  }
})
// 设置位置
watchEffect(() => {
  if (markerRef.value) {
    (markerRef.value as any).setPosition(position.value && [position.value.lng, position.value.lat])
  }
})
// 监听移动事件（用户拖拽），更新位置
watch(markerRef, marker => {
  if (marker) {
    marker.on('moving', () => {
      const {lng, lat} = marker.getPosition() || {lng: 0, lat: 0}
      position.value = {lng, lat}
    })
    marker.on('dragging', (ev) => {
      console.log('dragging', ev, marker.getPosition())
      const {lng, lat} = marker.getPosition() || {lng: 0, lat: 0}
      if (lng != position.value?.lng || lat != position.value?.lat) {
        position.value = {lng, lat}
      }
    })
  }
}, {immediate: true})

// 设置标题
watchEffect(() => {
  if (markerRef.value) {
    markerRef.value.setTitle(props.markerTitle || '')
  }
})

// 设置可见性
watchEffect(() => {
  if (markerRef.value) {
    if (props.markerVisible) {
      markerRef.value.show()
    } else {
      markerRef.value.hide()
    }
  }
})

// 设置是否可拖拽移动
watchEffect(() => {
  if (markerRef.value) {
    markerRef.value.setDraggable(props.markerDraggable)
  }
})

// 设置文本标注
const offsetRef = PsrAMapContext.usePixel(computed(() => props.markerLabelOffset))
watchEffect(() => {
  if (markerRef.value) {
    if (props.markerLabel) {
      markerRef.value.setLabel({
        content: props.markerLabel || '',
        offset: offsetRef.value,
        direction: props.markerLabelDirection
      })
    } else {
      markerRef.value.setLabel()
    }
  }
})

// 监听点标记实例对象，地图实例对象，（重新）绘制点标记
watchEffect(() => {
  if (markerRef.value) {
    // 将点标记添加到地图
    props.aMap.add(markerRef.value)
  }
})

// 组件卸载时从地图上删除点标记
onUnmounted(() => {
  if (markerRef.value) {
    props.aMap.remove(markerRef.value)
  }
})
</script>