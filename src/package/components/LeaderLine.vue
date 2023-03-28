<template>
  <div>
    <div ref="canvasRef" style="position: relative"/>
  </div>
</template>

<script lang="ts" setup>
import {computed, onUnmounted, ref, watch} from "vue";
import LeaderLine from "leader-line-new";
import {PsrLeaderLineTypes} from "../types";

(LeaderLine as any).positionByWindowResize = false

const props = defineProps<{
  leaderLineStart?: PsrLeaderLineTypes.Element
  leaderLineEnd?: PsrLeaderLineTypes.Element,
  leaderLinePointAnchorStart?: Omit<PsrLeaderLineTypes.PointAnchorOptions, 'element'>,
  leaderLinePointAnchorEnd?: Omit<PsrLeaderLineTypes.PointAnchorOptions, 'element'>,
  leaderLineAreaAnchorStart?: Omit<PsrLeaderLineTypes.AreaAnchorOptions, 'element'>,
  leaderLineAreaAnchorEnd?: Omit<PsrLeaderLineTypes.AreaAnchorOptions, 'element'>,
  leaderLineHoverAnchorStart?: Omit<PsrLeaderLineTypes.MouseHoverAnchorOptions, 'element'>,
  leaderLineHoverAnchorEnd?: Omit<PsrLeaderLineTypes.MouseHoverAnchorOptions, 'element'>,
  leaderLineOptions?: PsrLeaderLineTypes.Options
}>()

const canvasRef = ref<HTMLDivElement>()
const line = ref<[LeaderLine, HTMLElement]>()
let fixPosInt: NodeJS.Timeout;

onUnmounted(() => {
  eraseLine()
})

const leaderLinePoints = computed(() => ({start: props.leaderLineStart, end: props.leaderLineEnd}))
watch(leaderLinePoints, leaderLinePoints => {
  eraseLine()
  if (leaderLinePoints.start && leaderLinePoints.end) {
    const drawInt = setInterval(() => {
      if (ifPointElAttached()) {
        try {
          drawLine()
        } finally {
          clearInterval(drawInt)
        }
      }
    }, 100)
  }
})

function eraseLine() {
  if (fixPosInt) {
    clearInterval(fixPosInt)
  }
  if (line.value) {
    if (canvasRef.value) {
      canvasRef.value?.removeChild(line.value[1])
    }
    line.value = undefined
  }
}

function ifPointElAttached() {
  return props.leaderLineStart && props.leaderLineEnd
      && !(props.leaderLineStart.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED)
      && !(props.leaderLineEnd.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED)
}

function drawLine() {
  if (props.leaderLineStart && props.leaderLineEnd && canvasRef.value) {
    let startElement: PsrLeaderLineTypes.Element | PsrLeaderLineTypes.AnchorAttachment = props.leaderLineStart
    if (props.leaderLinePointAnchorStart) {
      startElement = LeaderLine.pointAnchor(props.leaderLineStart, props.leaderLinePointAnchorStart)
    } else if (props.leaderLineAreaAnchorStart) {
      startElement = LeaderLine.areaAnchor(props.leaderLineStart, props.leaderLineAreaAnchorStart)
    } else if (props.leaderLineHoverAnchorStart) {
      startElement = LeaderLine.mouseHoverAnchor(props.leaderLineStart, props.leaderLineHoverAnchorStart.showEffectName, props.leaderLineHoverAnchorStart)
    }
    let endElement: PsrLeaderLineTypes.Element | PsrLeaderLineTypes.AnchorAttachment = props.leaderLineEnd
    if (props.leaderLinePointAnchorEnd) {
      endElement = LeaderLine.pointAnchor(props.leaderLineEnd, props.leaderLinePointAnchorEnd)
    } else if (props.leaderLineAreaAnchorEnd) {
      endElement = LeaderLine.areaAnchor(props.leaderLineEnd, props.leaderLineAreaAnchorEnd)
    } else if (props.leaderLineHoverAnchorEnd) {
      endElement = LeaderLine.mouseHoverAnchor(props.leaderLineEnd, props.leaderLineHoverAnchorEnd.showEffectName, props.leaderLineHoverAnchorEnd)
    }
    const canvasEl = canvasRef.value
    const leaderLine = new LeaderLine(
        startElement,
        endElement,
        props.leaderLineOptions
    )
    const svg = document.getElementById(`leader-line-${(leaderLine as any)._id}-line-path`)!.parentElement!.parentElement!
    canvasEl.appendChild(svg)
    line.value = [leaderLine, svg]
    fixPosition()
    fixPosInt = setInterval(fixPosition, 100)
  }
}

function fixPosition() {
  if (canvasRef.value) {
    canvasRef.value.style.transform = 'translate(' +
        (-canvasRef.value.parentElement!.getBoundingClientRect().left - scrollX) + 'px, ' +
        (-canvasRef.value.parentElement!.getBoundingClientRect().top - scrollY) + 'px)'
  }
  if (line.value && ifPointElAttached()) {
    line.value[0].position()
  }
}
</script>