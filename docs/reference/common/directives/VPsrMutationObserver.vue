<template>
  <div @click="count++"
       v-psr-mutation-observer="{handler:callback,options:{attributes:true,attributeOldValue:true}}"
       :data="count">
    {{ count }}
  </div>
  <div v-if="mutation">
    {{ mutation.attributeName }}: {{ mutation.oldValue }}->{{ (mutation.target as HTMLDivElement).getAttribute('data')}}
  </div>
</template>

<script setup lang="ts">
import {vPsrMutationObserver} from "@psr-framework/vue3-plugin";
import {ref} from "vue";

const count = ref<number>(0);
const mutation = ref<MutationRecord>()

function callback(entry: MutationRecord[]) {
  mutation.value = entry && entry[0]
}
</script>