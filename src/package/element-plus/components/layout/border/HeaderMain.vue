<template>
  <el-container style="height: 100%;" v-loading="loading">
    <el-header v-if="$slots.header" class="ct-header">
      <slot name="header"/>
    </el-header>
    <el-main class="ct-main">
      <slot name="main"/>
    </el-main>
    <el-footer v-if="$slots.footer" class="ct-footer">
      <slot name="footer"/>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import {ElContainer, ElFooter, ElHeader, ElMain, vLoading} from "element-plus"

withDefaults(defineProps<{
  loading?: boolean
}>(), {loading: false})
</script>

<style lang="scss" scoped>
.ct-header {
  height: auto;
  padding: 0;
}

.ct-footer {
  height: auto;
  padding: 0;
}

.ct-main {
  padding: 0;
  overflow: hidden;
}
</style>