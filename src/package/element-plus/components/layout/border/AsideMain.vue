<template>
  <el-container style="height: 100%;" v-loading="loading">
    <el-aside v-if="$slots.left" class="ct-aside">
      <slot name="left"/>
    </el-aside>
    <el-main class="ct-main">
      <slot name="main"/>
    </el-main>
    <el-aside v-if="$slots.right" class="ct-aside">
      <slot name="right"/>
    </el-aside>
  </el-container>
</template>

<script setup lang="ts">
import {ElAside, ElContainer, ElMain, vLoading} from "element-plus"

withDefaults(defineProps<{
  loading?: boolean
}>(), {loading: false})
</script>

<style lang="scss" scoped>
.ct-aside {
  width: fit-content;
  //height: 100%;
  //padding: 0;
}

.ct-main {
  padding: 0;
}
</style>