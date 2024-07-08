<script setup lang="ts">
import {ref} from "vue";
import {ElCheckbox, ElForm, ElFormItem, ElInput, ElInputNumber, ElSlider, ElColorPicker} from "element-plus";
import {PsrQrcode} from "@psr-framework/vue3-plugin"

const input = ref(`
test qrcode content
`)

// 版本参数，支持的值为1-40，如果不指定，则根据内容使用合适的值
const versionSpecified = ref(false)
const versionInput = ref(1)
// 纠错等级参数，支持的模式为L、M、Q、H，如果不指定，默认为M
const errorCorrectionLevelInput = ref(0)
const errorCorrectionLevels = ["L", "M", "Q", "H"]
// 掩码参数，支持的值为0-7，如果不指定，则根据版本和内容使用合适的值
const maskPatternSpecified = ref(false)
const maskPatternInput = ref(0)
// 颜色参数
const colorDarkInput = ref('#000000ff')
const colorLightInput = ref('#ffffffff')
</script>

<template>
  <div style="height: 500px;">
    <el-form
        style="width: 50%;height:100%;display: inline-block;vertical-align: top;padding:1em;"
        label-width="auto"
    >
      <el-form-item label="内容">
        <el-input
            class="input"
            style="height:200px;display: inline-block;"
            type="textarea"
            autosize
            resize="none"
            v-model="input"
        />
      </el-form-item>
      <el-form-item label="版本">
        <el-checkbox v-model="versionSpecified"/>
        <el-input-number
            style="margin-left: 1em;"
            :min="1"
            :max="40"
            :disabled="!versionSpecified"
            v-model="versionInput"
        />
      </el-form-item>
      <el-form-item label="纠错等级">
        <el-slider
            :min="0"
            :max="3"
            :step="1"
            :marks="{0: 'L', 1: 'M', 2: 'Q', 3: 'H'}"
            v-model="errorCorrectionLevelInput"
        />
      </el-form-item>
      <el-form-item label="掩膜图案">
        <el-checkbox v-model="maskPatternSpecified">指定</el-checkbox>
        <el-slider
            :min="0"
            :max="7"
            :step="1"
            :marks="{0: '0', 1: '1', 2: '2', 3: '3',4:'4',5:'5',6:'6',7:'7'}"
            :disabled="!maskPatternSpecified"
            v-model="maskPatternInput"
        />
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="colorDarkInput" color-format="hex" show-alpha/>
        <el-color-picker v-model="colorLightInput" color-format="hex" show-alpha/>
      </el-form-item>
    </el-form>
    <psr-qrcode
        style="width: 50%;height:250px;display: inline-block;vertical-align: top;border: 1px solid red;"
        :qrcode-content="input"
        :qrcode-version="versionSpecified?versionInput:undefined"
        :qrcode-error-correction-level="errorCorrectionLevels[errorCorrectionLevelInput]"
        :qrcode-mask-pattern="maskPatternSpecified?maskPatternInput:undefined"
        :qrcode-color-dark="colorDarkInput"
        :qrcode-color-light="colorLightInput"
    />
  </div>
</template>

<style scoped lang="scss">
.input :deep(.el-textarea__inner) {
  height: 100% !important;
}
</style>
