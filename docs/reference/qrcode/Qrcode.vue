<script setup lang="ts">
import {ElForm, ElFormItem, ElInput, ElSlider} from "element-plus";
import {PsrQrcode} from "@psr-framework/vue3-plugin"
import {ref} from "vue";

const input = ref(`
test qrcode content
`)
const errorCorrectionLevelInput = ref(0)
const errorCorrectionLevels = ["L", "M", "Q", "H"]
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
    </el-form>
    <psr-qrcode
        style="width: 50%;height:100%;display: inline-block;vertical-align: top;"
        :qrcode-content="input"
        :qrcode-error-correction-level="errorCorrectionLevels[errorCorrectionLevelInput]"
    />
  </div>
</template>

<style scoped lang="scss">
.input :deep(.el-textarea__inner) {
  height: 100% !important;
}
</style>
