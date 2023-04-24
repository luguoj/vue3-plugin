<template>
    <div v-psr-resize-observer="onResize">
        <div :style="{width:designSize.width*scale+'px',height:designSize.height*scale+'px'}"
             style="position: relative;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%)">
            <iframe
                    style="transform-origin: top left"
                    :style="{scale}"
                    width="150" height="60" frameborder="0" scrolling="no" hspace="0"
                    src="https://i.tianqi.com/?c=code&a=getcode&id=84&color=#2266b8&icon=1"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {vPsrResizeObserver} from "@psr-framework/vue3-plugin-utils"
import {computed, ref} from "vue";

const designSize = {width: 150, height: 60}
const rootSize = ref({...designSize})
const scale = computed(() => Math.min(rootSize.value.width / designSize.width, rootSize.value.height / designSize.height))

function onResize(entry: ResizeObserverEntry) {
    rootSize.value.width = Math.floor(entry.contentRect.width)
    rootSize.value.height = Math.floor(entry.contentRect.height)
}
</script>