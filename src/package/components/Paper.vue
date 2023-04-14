<template>
    <div ref="paperCtRef">

    </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {dia, shapes} from "jointjs";
import "jointjs/dist/joint.css"

const props = withDefaults(defineProps<{
    paperOptions: Omit<dia.Paper.Options, "el" | "model">
}>(), {
    paperOptions: () => ({
        width: 600,
        height: 400,
        gridSize: 1,
        cellViewNamespace: shapes
    })
})

const paperCtRef = ref<HTMLElement>()
watch(paperCtRef, paperCt => {
    if (paperCt != undefined) {
        const graph = new dia.Graph({}, {cellNamespace: shapes})
        const paper = new dia.Paper({
            ...props.paperOptions,
            el: paperCt,
            model: graph
        })
    }
})
</script>

<style lang="scss" scoped>

</style>