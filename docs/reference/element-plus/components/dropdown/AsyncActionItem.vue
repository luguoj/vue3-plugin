<template>
  <el-dropdown>
    <h3>Dropdown</h3>
    <template #dropdown>
      <el-dropdown-menu>
        <psr-el-async-action-dropdown-item
            :item-action="buttonAction"
        >
          Async Action
        </psr-el-async-action-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {ElDropdown, ElDropdownMenu} from "element-plus";
import "element-plus/es/components/dropdown/style/css"
import "element-plus/es/components/dropdown-menu/style/css"
import {PsrElAsyncActionDropdownItem} from "@psr-framework/vue3-plugin";

function buttonAction(result: any) {
  console.log(result)
  return new Promise(resolve => setTimeout(resolve, 3000))
}
</script>