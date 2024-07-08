<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as QRCode from "qrcode"
import {usePsrColorScheme, vPsrResizeObserver} from "@package/dom-utils";

const canvasRef = ref<HTMLCanvasElement>()
const props = withDefaults(defineProps<{
  qrcodeContent?: string
  qrcodeVersion?: number
  qrcodeErrorCorrectionLevel?: "low" | "medium" | "quartile" | "high" | "L" | "M" | "Q" | "H"
  qrcodeMaskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  qrcodeColorDark?: string
  qrcodeColorLight?: string
}>(), {
  qrcodeErrorCorrectionLevel: 'M',
  qrcodeColorDark: '#000000ff',
  qrcodeColorLight: '#ffffffff'
})

const err = ref<Error>()
const colorScheme = usePsrColorScheme()
watchEffect(() => {
  const canvas = canvasRef.value
  const {
    qrcodeContent,
    qrcodeVersion,
    qrcodeErrorCorrectionLevel,
    qrcodeMaskPattern,
    qrcodeColorDark,
    qrcodeColorLight
  } = props
  if (canvas) {
    QRCode.toCanvas(
        canvas,
        qrcodeContent || "",
        {
          version: qrcodeVersion,
          maskPattern: qrcodeMaskPattern,
          errorCorrectionLevel: qrcodeErrorCorrectionLevel,
          width: codeWidth.value,
          color: {
            dark: colorScheme.value == 'dark' ? qrcodeColorLight : qrcodeColorDark,
            light: colorScheme.value == 'dark' ? qrcodeColorDark : qrcodeColorLight
          }
        }
    )
        .then(() => err.value = undefined)
        .catch(ex => err.value = ex)
  }
})

const codeWidth = ref(0)

function onResize(entry: ResizeObserverEntry) {
  codeWidth.value = Math.min(
      Math.floor(entry.contentRect.width),
      Math.floor(entry.contentRect.height)
  )
}
</script>

<template>
  <div v-psr-resize-observer="onResize">
    <canvas v-show="!err" ref="canvasRef"/>
    <div v-show="err">{{ err }}</div>
  </div>
</template>

<style scoped>

</style>