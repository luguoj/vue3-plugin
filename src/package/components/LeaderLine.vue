<template>
  <div>
    <div ref="canvasRef" style="position: relative"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watchEffect} from "vue";
import LeaderLine from "leader-line-new";

(LeaderLine as any).positionByWindowResize = false

const props = defineProps<{
  leaderLineStart?: Element
  leaderLineEnd?: Element,
  leaderLineOptions?: LeaderLine.Options
}>()

const canvasRef = ref<HTMLDivElement>()
const line = ref<LeaderLine>()

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style' && line.value) {
      fixPosition()
    }
  });
});

onMounted(() => {
  fixPosition()
  setInterval(fixPosition, 100)
})

watchEffect(() => {
  eraseLine()
  if (props.leaderLineStart && props.leaderLineEnd && canvasRef.value) {
    observer.observe(props.leaderLineStart, {attributes: true})
    observer.observe(props.leaderLineEnd, {attributes: true})
    line.value = new LeaderLine(
        props.leaderLineStart,
        props.leaderLineEnd,
        props.leaderLineOptions
    ) as any
    const svg = document.getElementById(`leader-line-${(line.value as any)._id}-line-path`)!.parentElement!.parentElement!
    canvasRef.value.appendChild(svg)
  }
})

function fixPosition() {
  if (canvasRef.value) {
    canvasRef.value.style.transform = 'translate(-' +
        (canvasRef.value.parentElement!.getBoundingClientRect().left + scrollX) + 'px, -' +
        (canvasRef.value.parentElement!.getBoundingClientRect().top + scrollY) + 'px)'
  }
  if (line.value) {
    line.value.position()
  }
}

function eraseLine() {
  if (line.value) {
    observer.disconnect()
    const svg = document.getElementById(`leader-line-${(line.value as any)._id}-line-path`)!.parentElement!.parentElement!
    if (canvasRef.value) {
      canvasRef.value?.removeChild(svg)
    }
  }
}
</script>