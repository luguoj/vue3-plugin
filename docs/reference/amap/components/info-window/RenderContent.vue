<script setup lang="ts">
import {PsrAMap, PsrAMapInfoWindow} from "@psr-framework/vue3-plugin";
import {ref} from "vue";
import ContentComponent from "./ContentComponent.vue";

const visible = ref(false)

const info = [];
info.push("<h4>PSR Framework</h4>");
info.push("<p>All rights reserved.</p>");
const content = info.join("")

</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="visible=!visible">开/关信息窗体: {{ visible }}</button>
    <psr-a-map
        style="height: 100%;"
    >
      <template #default="{map}">
        <psr-a-map-info-window
            :a-map="map"
            v-model:info-window-visible="visible"
        >
          <div v-html="content"/>
          <content-component/>
        </psr-a-map-info-window>
      </template>
    </psr-a-map>
  </div>
</template>