<template>
  <div>
    <div ref="canvasRef" style="position: relative"/>
  </div>
</template>

<script lang="ts" setup>
import {markRaw, onMounted, onUnmounted, ref, watch} from "vue";
import {PsrLeaderLineTypes} from "../types";

const props = defineProps<{
  // 引导线起点
  leaderLineStart: PsrLeaderLineTypes.Element
  // 引导线终点
  leaderLineEnd: PsrLeaderLineTypes.Element,
  // 引导线起点锚点
  leaderLinePointAnchorStart?: Omit<PsrLeaderLineTypes.PointAnchorOptions, 'element'>,
  // 引导线终点锚点
  leaderLinePointAnchorEnd?: Omit<PsrLeaderLineTypes.PointAnchorOptions, 'element'>,
  // 引导线起点锚点区域
  leaderLineAreaAnchorStart?: Omit<PsrLeaderLineTypes.AreaAnchorOptions, 'element'>,
  // 引导线终点锚点区域
  leaderLineAreaAnchorEnd?: Omit<PsrLeaderLineTypes.AreaAnchorOptions, 'element'>,
  // 引导线起点锚点鼠标悬停选项
  leaderLineHoverAnchorStart?: Omit<PsrLeaderLineTypes.MouseHoverAnchorOptions, 'element'>,
  // 引导线终点锚点鼠标悬停选项
  leaderLineHoverAnchorEnd?: Omit<PsrLeaderLineTypes.MouseHoverAnchorOptions, 'element'>,
  // 引导线选项
  leaderLineOptions?: PsrLeaderLineTypes.Options
  // 引导线隐藏
  leaderLineHide?: boolean
  // 引导线显示效果
  leaderLineShowEffect?: { name: PsrLeaderLineTypes.ShowEffectName, options?: PsrLeaderLineTypes.AnimationOptions }
}>()

// 引导线渲染画布
const canvasRef = ref<HTMLDivElement>()
// 引导线实例与SVG元素引用
const line = ref<[any, HTMLElement]>()
// 修正位置定时器
let fixPosInt: NodeJS.Timeout;

onMounted(() => {
  // 异步加载leader-line-new
  import("leader-line-new").then(Module => {
    // 禁用自动调整位置
    (Module.default as any).positionByWindowResize = false

    // 监控引导线端点变化
    watch(() => ({start: props.leaderLineStart, end: props.leaderLineEnd}), leaderLinePoints => {
      // 销毁旧的引导线
      eraseLine()
      // 定时检查端点的元素是否已经附加到文档中，进行绘制，并清除定时器
      const drawInt = setInterval(() => {
        if (ifPointElAttached()) {
          try {
            drawLine(Module.default)
          } finally {
            clearInterval(drawInt)
          }
        }
      }, 100)
    }, {deep: true, immediate: true})
  })
})

// 组件卸载时销毁引导线
onUnmounted(() => {
  eraseLine()
})

// 绘制引导线
function drawLine(LeaderLine: typeof import("leader-line-new")) {
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
        {
          ...props.leaderLineOptions,
          hide: !!props.leaderLineHide
        }
    )
    const svg = document.getElementById(`leader-line-${(leaderLine as any)._id}-line-path`)!.parentElement!.parentElement!
    canvasEl.appendChild(svg)
    line.value = [markRaw(leaderLine), markRaw(svg)]
    fixPosition()
    fixPosInt = setInterval(fixPosition, 100)
  }
}

// 监控引导线显隐变化
watch(() => props.leaderLineHide, hide => {
  // 如果引导线已经绘制，则根据显隐属性控制显隐
  if (line.value) {
    if (hide) {
      line.value[0].hide(props.leaderLineShowEffect?.name, props.leaderLineShowEffect?.options)
    } else {
      line.value[0].show(props.leaderLineShowEffect?.name, props.leaderLineShowEffect?.options)
    }
  }
})

// 销毁引导线
function eraseLine() {
  // 停止修正位置定时器
  if (fixPosInt) {
    clearInterval(fixPosInt)
  }
  // 销毁引导线
  if (line.value) {
    if (canvasRef.value) {
      canvasRef.value?.removeChild(line.value[1])
    }
    line.value = undefined
  }
}

// 判断端点元素是否已经挂载到文档中
function ifPointElAttached() {
  return props.leaderLineStart && props.leaderLineEnd
      && !(props.leaderLineStart.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED)
      && !(props.leaderLineEnd.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED)
}

// 修正位置
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