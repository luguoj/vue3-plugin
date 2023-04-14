<script setup lang="ts">
import {ref, watch} from "vue";
import "jointjs/dist/joint.css"
import {dia, shapes,} from "jointjs"

const divRef = ref<HTMLElement>()
watch(divRef, div => {
    if (div != undefined) {
        const graph = new dia.Graph({}, {cellNamespace: shapes})
        const paper = new dia.Paper({
            el: div,
            model: graph,
            width: 600,
            height: 400,
            gridSize: 1,
            cellViewNamespace: shapes
        })
        const rect = new shapes.standard.Rectangle();
        rect.position(100, 30)
        rect.resize(100, 40)
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        })
        rect.addTo(graph)
        const rect2 = rect.clone();
        rect2.translate(300, 0)
        rect2.attr('label/text', 'World!')
        rect2.addTo(graph)
        const link = new shapes.standard.Link();
        link.source(rect)
        link.target(rect2)
        link.addTo(graph)
    }
})
</script>

<template>
    <div ref="divRef" style="height: 400px;width: 600px;">

    </div>
</template>

<style scoped>
</style>
