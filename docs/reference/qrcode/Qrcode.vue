<script setup lang="ts">
import {ref} from "vue";
import {ElCheckbox, ElForm, ElFormItem, ElInput, ElInputNumber, ElSlider} from "element-plus";
import {PsrQrcode} from "@psr-framework/vue3-plugin"

const input = ref(`
test qrcode content
`)


const versionSpecified = ref(false)
const versionInput = ref(0)

const errorCorrectionLevelInput = ref(0)
const errorCorrectionLevels = ["L", "M", "Q", "H"]
const maskPatternSpecified = ref(false)
const maskPatternInput = ref(0)
</script>

<template>
  <div style="height: 500px;">
    <el-form
        style="width: 50%;height:100%;display: inline-block;vertical-align: top;"
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
      <el-form-item label="版本">
        <el-checkbox v-model="versionSpecified"/>
        <el-input-number
            style="margin-left: 1em;"
            :min="0"
            :max="40"
            :disabled="!versionSpecified"
            v-model="versionInput"
        />
      </el-form-item>
    </el-form>
    <psr-qrcode
        style="width: 50%;height:100%;display: inline-block;vertical-align: top;"
        :qrcode-content="input"
        :qrcode-version="versionSpecified?versionInput:undefined"
        :qrcode-error-correction-level="errorCorrectionLevels[errorCorrectionLevelInput]"
        :qrcode-mask-pattern="maskPatternSpecified?maskPatternInput:undefined"
    />
  </div>
</template>

<style scoped lang="scss">
.input :deep(.el-textarea__inner) {
  height: 100% !important;
}
</style>
