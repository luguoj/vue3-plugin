<script setup lang="ts">
import {PsrAntvG6,} from "../package";
import {reactive, watchEffect} from "vue";
import {VueNodeTag} from "./customEl.ts";

const edge1 = PsrAntvG6.useEdgeWithExtensions({
    extendShape: 'line',
    extensions: [
        {type: 'line-growth'}
    ]
})
const edge2 = PsrAntvG6.useEdgeWithExtensions({
    extendShape: 'line',
    extensions: [
        {type: 'line-dash'}
    ]
})

const vueNode2 = PsrAntvG6.useNodeWithExtensions({
    extendShape: 'rect',
    extensions: [
        {type: 'el-overlay', cfg: {tag: VueNodeTag}}
    ]
})

const circleNode1 = PsrAntvG6.useNodeWithExtensions({
    extendShape: 'ellipse',
    extensions: [
        {
            type: 'circle-scale'
        },
        {
            type: 'circle-shadow'
        },
        {type: 'el-overlay', cfg: {tag: VueNodeTag}}
    ]
})

const svgNode2 = PsrAntvG6.useNodeWithExtensions({
    extendShape: 'rect',
    extensions: [
        {
            type: 'svg-overlay',
            cfg: {
                designSize: [32, 32],
                paths: ["M24.36,31h-0.72v-7.492c0-3.556-2.414-6.612-5.872-7.432c-0.15-0.036-0.261-0.163-0.275-0.316   c-0.015-0.154,0.071-0.3,0.212-0.363c1.517-0.675,2.496-2.181,2.496-3.836c0-2.316-1.884-4.201-4.2-4.201s-4.2,1.884-4.2,4.201   c0,1.656,0.98,3.162,2.496,3.836c0.141,0.063,0.226,0.209,0.212,0.363c-0.014,0.153-0.125,0.281-0.275,0.316   c-3.458,0.819-5.872,3.875-5.872,7.432V31h-0.72v-7.492c0-3.597,2.256-6.725,5.585-7.887c-1.327-0.907-2.147-2.421-2.147-4.06   c0-1.964,1.157-3.664,2.825-4.452C14.101,6.617,14.2,6.097,14.2,5.561c0-2.316-1.884-4.201-4.2-4.201S5.799,3.244,5.799,5.561   c0,1.655,0.98,3.162,2.496,3.836C8.437,9.46,8.522,9.606,8.507,9.76c-0.014,0.153-0.125,0.281-0.275,0.316   C4.774,10.896,2.36,13.948,2.36,17.5V25H1.64v-7.5c0-3.592,2.257-6.718,5.585-7.879C5.899,8.714,5.08,7.2,5.08,5.561   c0-2.713,2.207-4.92,4.92-4.92s4.92,2.207,4.92,4.92c0,0.422-0.052,0.836-0.157,1.237c0.791-0.205,1.683-0.205,2.473,0   c-0.104-0.401-0.157-0.815-0.157-1.237c0-2.713,2.208-4.92,4.921-4.92s4.921,2.207,4.921,4.92c0,1.64-0.82,3.154-2.146,4.061   c3.329,1.161,5.586,4.287,5.586,7.879V25H29.64v-7.5c0-3.552-2.414-6.604-5.872-7.424c-0.15-0.036-0.261-0.163-0.275-0.316   c-0.015-0.154,0.071-0.3,0.212-0.363C25.221,8.722,26.2,7.216,26.2,5.561c0-2.316-1.884-4.201-4.2-4.201s-4.2,1.884-4.2,4.201   c0,0.536,0.099,1.056,0.295,1.548c1.669,0.789,2.826,2.488,2.826,4.452c0,1.64-0.82,3.154-2.146,4.061   c3.329,1.162,5.586,4.29,5.586,7.887L24.36,31L24.36,31z M19.255,24.255l-0.51-0.51L15,27.491l-1.746-1.746l-0.509,0.51L15,28.509   L19.255,24.255z"],
                size: 16,
                position: [25 - 8, 25 - 8]
            }
        }
    ]
})

console.log(edge1, edge2)

const {
    ctGraphRef, ctMiniMapRef, graph
} = PsrAntvG6.useGraph()
const node1Data = reactive({compText: 'test1', compNumber: 1})

setInterval(() => {
    node1Data.compNumber++
}, 1000)
watchEffect(() => {
    if (graph.value) {
        const _graph = graph.value
        new Promise((resolve, reject) => setTimeout(resolve, 500)).then(() => {
            _graph.data({
                nodes: [{
                    id: '1',
                    label: '1',
                    size: [80, 20],
                    type: vueNode2,
                    data: node1Data
                }, {
                    id: '2',
                    label: '2',
                    size: 50,
                    type: svgNode2,
                }, {
                    id: '3',
                    label: '3',
                    size: [50, 25],
                    type: circleNode1,
                }],
                edges: [{
                    source: '1',
                    target: '2',
                    type: 'test'
                }, {
                    source: '2',
                    target: '3',
                    type: edge2
                }, {
                    source: '3',
                    target: '1',
                    type: edge1
                }]
            })
            _graph.render()
            _graph.setItemState('2', 'circle-scale', true)
            _graph.setItemState('2', 'circle-shadow', true)
        })
        _graph.on('node:mouseenter', (ev) => {
            console.log('node:mouseenter')
            const node = ev.item;
            node1Data.compText = 'yes'
            if ("getEdges" in node) {
                const edges = node.getEdges();
                edges.forEach((edge) => _graph.setItemState(edge, 'line-growth', true));
            }
        });
        _graph.on('node:mouseleave', (ev) => {
            console.log('node:mouseleave')
            const node = ev.item;
            node1Data.compText = 'no'
            if ("getEdges" in node) {
                const edges = node.getEdges();
                edges.forEach((edge) => _graph.setItemState(edge, 'line-growth', false));
            }
        });
    }
})
</script>

<template>
    <div style="height: 100%;position: relative;overflow: hidden;">
        <div style="width:100%; height:100%;" ref="ctGraphRef"/>
        <div style="width: 200px;height: 120px;right: 30px;top:30px;position: absolute;" ref="ctMiniMapRef"/>
    </div>
</template>

<style scoped>

</style>