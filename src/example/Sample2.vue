<script setup lang="ts">
import {ref, watch} from "vue";
import "jointjs/dist/joint.css"
import {dia, shapes, elementTools} from "jointjs"

interface Box {
    width: number
    height: number
    left: number
    top: number
}

const divRef = ref<HTMLElement>()
const boxBlock1 = ref<Box>({
    width: 100,
    height: 40,
    left: 100,
    top: 30
})

const boxBlock2 = ref<Box>({
    width: 100,
    height: 40,
    left: 400,
    top: 30
})

function computeBoxStyle(box: Box): any {
    return {
        ...box,
        width: box.width ? (box.width + "px") : 0,
        height: box.height ? (box.height + "px") : 0,
        left: box.left ? (box.left + "px") : 0,
        top: box.top ? (box.top + "px") : 0,
    }
}

watch(divRef, div => {
    if (div != undefined) {
        const graph = new dia.Graph({}, {cellNamespace: shapes})
        const paper = new dia.Paper({
            el: div,
            model: graph,
            width: 600,
            height: 400,
            gridSize: 10,
            cellViewNamespace: shapes,
            // 限制元素在画布内移动
            restrictTranslate: true
        })
        const rect = buildRect(boxBlock1.value, paper, graph)
        const rect2 = buildRect(boxBlock2.value, paper, graph)
        const link = new shapes.standard.Link();
        link.source(rect)
        link.target(rect2)
        link.addTo(graph)
    }
})


function buildRect(box: Box, paper: dia.Paper, graph: dia.Graph) {
    const rect = new shapes.standard.Rectangle({
        position: {x: box.left - 2, y: box.top - 20},
        size: {width: box.width + 6, height: box.height + 24},
        attrs: {
            body: {
                style: {
                    // 线色
                    stroke: "var(--border-color)",
                    // 填充色
                    fill: "var(--bg-color)",
                    // 线型
                    "stroke-dasharray": "5,1"
                },
                strokeWidth: 1
            },
            label: {
                text: 'rect',
                // 文本置顶
                refY: 0,
                // 文本顶部对其
                yAlignment: 'top',
                style: {}
            }
        },
    }).addTo(graph);
    // 鼠标移入显示边框工具
    const rectView = rect.findView(paper).addTools(
        new dia.ToolsView({
            tools: [
                new elementTools.Boundary()
            ]
        })
    ).hideTools()

    function onMouseEnter(elementView: dia.CellView) {
        if (elementView == rectView) {
            elementView.showTools();
        }
    }

    function onMouseLeave(elementView: dia.CellView) {
        if (elementView == rectView) {
            elementView.hideTools();
        }
    }


    paper.on('element:mouseenter', onMouseEnter)
    paper.on('element:mouseleave', onMouseLeave)

    // 位置改变时更新参数
    function onPositionChange(cell: dia.Cell) {
        if (cell == rect) {
            const pos = cell.getBBox().topLeft()
            box.left = pos.x + 2
            box.top = pos.y + 22
        }
    }

    graph.on('change:position', onPositionChange)
    return rect
}
</script>

<template>
    <div style="position: relative;">
        <div ref="divRef"
             style="height: 100%;width: 100%;position: absolute;--border-color: grey;--bg-color: #EEEEEE;"/>
        <div style="height: 100%;width: 100%;position: absolute;pointer-events: none">
            <div class="element-content" style="position: absolute;" :style="computeBoxStyle(boxBlock1)">block1</div>
            <div class="element-content" style="position: absolute;" :style="computeBoxStyle(boxBlock2)">block2</div>
        </div>
    </div>
</template>

<style scoped>
.element-content {
    pointer-events: all;
    border: solid 1px;
}
</style>
