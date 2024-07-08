<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {vPsrResizeObserver} from "@package/dom-utils";
import * as JsBarcodeNs from "jsbarcode"

const JsBarcode = (JsBarcodeNs as any).default as typeof JsBarcodeNs

const canvasRef = ref<HTMLCanvasElement>()
const props = withDefaults(defineProps<{
  barcodeContent?: string
  barcodeWidth?: number
  barcodeFormat?:
      "CODE128"
      | "EAN13"
      | "EAN8"
      | "EAN5"
      | "EAN2"
      | "UPC"
      | "CODE39"
      | "ITF14"
      | "MSI"
      | "MSI10"
      | "MSI11"
      | "MSI1010"
      | "MSI1110"
      | "pharmacode"
      | "codabar"
  barcodeDisplayValue?: boolean
  barcodeText?: string
  barcodeFont?: string
  barcodeFontItalic?: boolean
  barcodeFontBold?: boolean
  barcodeTextAlign?: "center" | "left" | "right"
  barcodeTextPosition?: "bottom" | "top"
  barcodeTextMargin?: number
  barcodeFontSize?: number
  barcodeBackground?: string
  barcodeLineColor?: string
  barcodeMargin?: number | [number, number] | [number, number, number] | [number, number, number, number]
}>(), {
  barcodeWidth: 2,
  barcodeFormat: "CODE128",
  barcodeDisplayValue: true,
  barcodeFont: "monospace",
  barcodeFontItalic: false,
  barcodeFontBold: false,
  barcodeTextAlign: 'center',
  barcodeTextPosition: 'bottom',
  barcodeTextMargin: 2,
  barcodeFontSize: 20,
  barcodeBackground: '#ffffff',
  barcodeLineColor: '#000000',
  barcodeMargin: 10,
})

const err = ref<Error>()

watchEffect(() => {
  const canvas = canvasRef.value
  const {
    barcodeContent,
    barcodeWidth,
    barcodeFormat,
    barcodeDisplayValue,
    barcodeText,
    barcodeFont,
    barcodeFontItalic,
    barcodeFontBold,
    barcodeTextAlign,
    barcodeTextPosition,
    barcodeTextMargin,
    barcodeFontSize,
    barcodeBackground,
    barcodeLineColor,
    barcodeMargin
  } = props
  const marginTop = typeof barcodeMargin === "number" ? barcodeMargin : barcodeMargin[0]
  const marginRight = typeof barcodeMargin === "number" ? barcodeMargin : barcodeMargin[1]
  const marginBottom = typeof barcodeMargin === "number" ? barcodeMargin
      : barcodeMargin.length < 3 ? barcodeMargin[0] : barcodeMargin[2]
  const marginLeft = typeof barcodeMargin === "number" ? barcodeMargin
      : barcodeMargin.length < 4 ? barcodeMargin[1] : barcodeMargin[3]
  const fontOptions: string[] = []
  if (barcodeFontItalic) fontOptions.push("italic")
  if (barcodeFontBold) fontOptions.push("bold")
  if (canvas) {
    try {
      JsBarcode(
          canvas,
          barcodeContent || "",
          {
            // 条形码格式
            format: barcodeFormat,
            // 单条条形码宽度
            width: barcodeWidth,
            // 条形码高度
            height: codeSize.value.height - marginTop - marginBottom - (barcodeDisplayValue ? (barcodeTextMargin - barcodeFontSize) : 0),
            // 是否显示文本
            displayValue: barcodeDisplayValue,
            // 覆盖默认的文本内容
            text: barcodeText,
            // 字体选项
            fontOptions: fontOptions.join(" "),
            // 字体
            font: barcodeFont,
            // 文本对齐方式
            textAlign: barcodeTextAlign,
            // 文本位置
            textPosition: barcodeTextPosition,
            // 文本与条形码之间的间距
            textMargin: barcodeTextMargin,
            // 字体大小
            fontSize: barcodeFontSize,
            // 条形码背景色
            background: barcodeBackground,
            // 条形码颜色
            lineColor: barcodeLineColor,
            margin: 0,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
          }
      )
      err.value = undefined
    } catch (e: any) {
      err.value = e
    }
  }
})

const codeSize = ref({width: 0, height: 0})

function onResize(entry: ResizeObserverEntry) {
  codeSize.value = {width: entry.contentRect.width, height: entry.contentRect.height}
}
</script>

<template>
  <div v-psr-resize-observer="onResize">
    <canvas v-show="!err" ref="canvasRef" style="width:100%;height:100%;"/>
    <div v-show="err">{{ err }}</div>
  </div>
</template>

<style scoped>

</style>