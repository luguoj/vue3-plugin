<script setup lang="ts">
import {ref, watchEffect} from "vue";
import * as QRCode from "qrcode"
import {vPsrResizeObserver} from "@package/dom-utils";

const canvasRef = ref<HTMLCanvasElement>()
const props = withDefaults(defineProps<{
  qrcodeContent?: string,
  qrcodeErrorCorrectionLevel?: QRCode.QRCodeErrorCorrectionLevel,
}>(), {
  qrcodeErrorCorrectionLevel: 'M',
})

const err = ref<Error>()

watchEffect(() => {
  const canvas = canvasRef.value
  const {
    qrcodeContent,
    qrcodeErrorCorrectionLevel
  } = props
  if (canvas) {
    QRCode.toCanvas(
        canvas,
        qrcodeContent,
        {
          scale: 1,
          errorCorrectionLevel: qrcodeErrorCorrectionLevel,
          width: codeWidth.value
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