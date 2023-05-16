<script setup lang="ts">
import {PsrAntvG6,} from "../package";
import {reactive, ref, watchEffect} from "vue";
import VueNodeComp from "./VueNodeComp.vue";


const edge1 = PsrAntvG6.useEdgeWithAnimation({
    edge: 'line',
    animations: [
        {type: 'line-growth'}
    ]
})
const edge2 = PsrAntvG6.useEdgeWithAnimation({
    edge: 'line',
    animations: [
        {type: 'line-growth'}
    ]
})


const vueNode1 = PsrAntvG6.useVueNode({
    component: VueNodeComp
});

console.log(edge1, edge2)

const {
    ctGraphRef, ctMiniMapRef, graph
} = PsrAntvG6.useGraph()
const node1Data = reactive({compText: 'test1', compNumber: 1})
const node2Data = reactive({compText: 'test2'})

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
                    size:[80,20],
                    type: vueNode1,
                    data: node1Data
                }, {
                    id: '2',
                    label: '2',
                    type: vueNode1,
                    data: node2Data
                }],
                edges: [{
                    source: '1',
                    target: '2',
                    type: edge1
                }]
            })
            _graph.render()
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