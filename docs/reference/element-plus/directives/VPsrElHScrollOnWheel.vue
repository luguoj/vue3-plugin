<script setup lang="ts">
import {shallowRef} from "vue";
import {ElScrollbar, ScrollbarInstance} from "element-plus"
import {vPsrElHScrollOnWheel} from "@psr-framework/vue3-plugin";

const scrollbarRef = shallowRef<ScrollbarInstance>()

</script>

<template>
  <h3>V scrolling</h3>
  <div style="width: 200px;height: 200px;border:var(--el-border);">
    <el-scrollbar always>
      <div style="white-space: nowrap;">
        asdfasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasd<br/>
        fasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfa<br/>
        sfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasd<br/>
        fasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfas<br/>
        dfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasfa<br/>
        sdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdf<br/>
        asdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasfas<br/>
        dfasdfasdfasdfasdfasdasdfasdfasdfas<br/>
        dfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasd<br/>
      </div>
    </el-scrollbar>
  </div>
  <h3>H scrolling</h3>
  <div style="width: 200px;height: 200px;border:var(--el-border);">
    <el-scrollbar always ref="scrollbarRef" v-psr-el-h-scroll-on-wheel>
      <div style="white-space: nowrap;">
        asdfasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasd<br/>
        fasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfa<br/>
        sfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasd<br/>
        fasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfas<br/>
        dfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfa<br/>
        sdfasdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasfa<br/>
        sdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdf<br/>
        asdfasdfasfasdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasfas<br/>
        dfasdfasdfasdfasdfasdasdfasdfasdfas<br/>
        dfasdfasdfasdfasdfasdfasfasdfasdfasdfasdfasdfasd<br/>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
</style>
