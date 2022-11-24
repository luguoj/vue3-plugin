<template>
  <div class="ct-root">
    <el-space wrap>
      <slot/>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import {ElSpace} from "element-plus"
import "element-plus/es/components/space/style/css"
</script>

<style lang="scss" scoped>
.ct-root {
  height: auto;
  padding: 0.5rem;
  background-color: var(--el-border-color-extra-light);
  border-bottom: var(--el-border);
}
</style>