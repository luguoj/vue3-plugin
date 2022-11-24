<script setup lang="ts">
import {PsrAsyncActionButton} from "../../..";
import {Search} from '@element-plus/icons-vue'
// import {ElIcon} from "element-plus";
// import "element-plus/es/components/icon/style/css"

function buttonAction() {
  return new Promise(resolve => setTimeout(resolve, 3000))
}

</script>


<template>
  <PsrAsyncActionButton
      :icon="Search"
      :button-action="buttonAction"
  >abc
    <!--    <template #icon>-->
    <!--      <el-icon>-->
    <!--        <Search/>-->
    <!--      </el-icon>-->
    <!--    </template>-->
  </PsrAsyncActionButton>
</template>

<style scoped>
</style>
