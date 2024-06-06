<template>
    <div v-psr-resize-observer="onResize">
        <div :style="{width:designSize.width*scale+'px',height:designSize.height*scale+'px'}"
             style="position: relative;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%)">
            <iframe
                    style="transform-origin: top left;color-scheme: light"
                    :style="{scale}"
                    width="150" height="60" frameborder="0" scrolling="no" hspace="0" allowtransparency="true"
                    :src="`https://i.tianqi.com/?c=code&a=getcode&id=84&color=${colorStyleRef}&icon=1`"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import {vPsrResizeObserver} from "../dom-utils"
import {computed, getCurrentInstance, onMounted, onUnmounted, Ref, ref} from "vue";

let updateInt: NodeJS.Timeout | undefined
const vm = getCurrentInstance()
const colorStyleRef: Ref<string> = ref('#2266b8')

function update() {
    if (vm?.proxy?.$el) {
        colorStyleRef.value = getComputedStyle(vm?.proxy?.$el).getPropertyValue('color')
    }
}

onMounted(() => {
    update()
    updateInt = setInterval(() => {
        update()
    }, 500)
})
onUnmounted(() => {
    clearInterval(updateInt)
})

const designSize = {width: 150, height: 60}
const rootSize = ref({...designSize})
const scale = computed(() => Math.min(rootSize.value.width / designSize.width, rootSize.value.height / designSize.height))

function onResize(entry: ResizeObserverEntry) {
    rootSize.value.width = Math.floor(entry.contentRect.width)
    rootSize.value.height = Math.floor(entry.contentRect.height)
}
</script>