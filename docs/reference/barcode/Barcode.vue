<script setup lang="ts">
import {computed, ref} from "vue";
import {
  ElCheckbox,
  ElColorPicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSlider
} from "element-plus";
import {PsrBarcode} from "@psr-framework/vue3-plugin"

const input = ref(`
test barcode content
`)
// 条码线宽度，不指定默认值为 2
const widthInput = ref<number>(2)
// 格式参数，不指定默认值为 CODE128
const formatInput = ref("CODE128")
// 支持的格式
const formatOptions = [
  "CODE128",
  "EAN13",
  "EAN8",
  "EAN5",
  "EAN2",
  "UPC",
  "CODE39",
  "ITF14",
  "MSI",
  "MSI10",
  "MSI11",
  "MSI1010",
  "MSI1110",
  "pharmacode",
  "codabar"
]
// 是否显示值文本
const displayValueInput = ref(true)
// 覆盖默认的文本内容，不指定默认显示条码值
const textInput = ref<string>()
// 文本字体， 不指定默认值为 monospace
const fontInput = ref<string>()
const fontOptions = [
  "monospace",
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
  "Impact",
  "Lucida Console",
  "Tahoma",
  "Times New Roman",
  "Verdana"
]
// 是否加粗
const fontBoldInput = ref<boolean>(false)
// 是否使用斜体
const fontItalicInput = ref<boolean>(false)
// 文本对齐方式，不指定默认值为 center
const textAlignInput = ref<"center" | "left" | "right">()
const textAlignOptions = [
  "center",
  "left",
  "right"
]
// 文本位置，不指定默认值为 bottom
const textPositionInput = ref<"bottom" | "top">()
const textPositionOptions = [
  "bottom",
  "top"
]
// 文本与条码间距，不指定默认值为 2
const textMarginInput = ref<number>(2)
// 文本大小，不指定默认值为 20
const fontSizeInput = ref<number>(20)
// 背景颜色，不指定默认值为 #ffffffff
const backgroundInput = ref('#ffffffff')
// 线条颜色，不指定默认值为 #000000ff
const lineColorInput = ref('#000000ff')
// 边距，不指定默认值为 10
const marginTopInput = ref<number>(10)
const marginRightInput = ref<number>(10)
const marginBottomInput = ref<number>(10)
const marginLeftInput = ref<number>(10)
const margin = computed<number | [number, number] | [number, number, number] | [number, number, number, number]>(() => {
  return [marginTopInput.value, marginRightInput.value, marginBottomInput.value, marginLeftInput.value]
})

</script>

<template>
  <div style="height: 900px;">
    <el-form
        style="width: 50%;height:100%;display: inline-block;vertical-align: top;padding:1em;"
        label-width="auto"
    >
      <el-form-item label="内容">
        <el-input
            v-model="input"
        />
      </el-form-item>
      <el-form-item label="线宽">
        <el-slider
            v-model="widthInput"
            :min="1"
            :max="10"
            :step="1"
        />
      </el-form-item>
      <el-form-item label="格式">
        <el-select
            clearable
            v-model="formatInput"
        >
          <el-option v-for="item in formatOptions" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="显示文本">
        <el-checkbox v-model="displayValueInput"/>
      </el-form-item>
      <el-form-item label="文本内容">
        <el-input
            clearable
            placeholder="覆盖默认的文本内容"
            v-model="textInput"
        />
      </el-form-item>
      <el-form-item label="文本字体">
        <el-select
            clearable
            v-model="fontInput"
        >
          <el-option v-for="item in fontOptions" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="加粗">
        <el-checkbox v-model="fontBoldInput"/>
      </el-form-item>
      <el-form-item label="斜体">
        <el-checkbox v-model="fontItalicInput"/>
      </el-form-item>
      <el-form-item label="文本对齐">
        <el-select
            clearable
            placeholder="默认居中"
            v-model="textAlignInput"
        >
          <el-option v-for="item in textAlignOptions" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文本位置">
        <el-select
            clearable
            placeholder="默认底部"
            v-model="textPositionInput"
        >
          <el-option v-for="item in textPositionOptions" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item label="文本与条码间距">
        <el-slider
            v-model="textMarginInput"
            :min="0"
            :max="48"
            :step="1"
        />
      </el-form-item>
      <el-form-item label="文本大小">
        <el-slider
            v-model="fontSizeInput"
            :min="0"
            :max="24"
            :step="1"
        />
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="lineColorInput" color-format="hex" show-alpha/>
        <el-color-picker v-model="backgroundInput" color-format="hex" show-alpha/>
      </el-form-item>
      <el-form-item label="边距" style="position: relative;">
        <el-input-number
            style="width: 100px;position: absolute;left: 60px;top: 0;"
            :min="0"
            v-model="marginTopInput"
            placeholder="上"
        />
        <el-input-number
            style="width: 100px;position: absolute;left: 0;top:40px;"
            :min="0"
            v-model="marginRightInput"
            placeholder="右"
        />
        <el-input-number
            style="width: 100px;position: absolute;left: 60px;top:80px;"
            :min="0"
            v-model="marginBottomInput"
            placeholder="下"
        />
        <el-input-number
            style="width: 100px;position: absolute;left: 120px;top:40px;"
            :min="0"
            v-model="marginLeftInput"
            placeholder="左"
        />
      </el-form-item>
    </el-form>
    <psr-barcode
        style="width: 50%;height:150px;display: inline-block;vertical-align: top;border: 1px solid red;"
        :barcode-content="input"
        :barcode-width="widthInput"
        :barcode-format="formatInput"
        :barcode-display-value="displayValueInput"
        :barcode-text="textInput"
        :barcode-font="fontInput"
        :barcode-font-bold="fontBoldInput"
        :barcode-font-italic="fontItalicInput"
        :barcode-text-align="textAlignInput"
        :barcode-text-position="textPositionInput"
        :barcode-text-margin="textMarginInput"
        :barcode-font-size="fontSizeInput"
        :barcode-background="backgroundInput"
        :barcode-line-color="lineColorInput"
        :barcode-margin="margin"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
