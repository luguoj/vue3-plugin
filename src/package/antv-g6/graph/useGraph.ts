import {onMounted, ref, shallowRef} from "vue";
import {Graph, Minimap} from "@antv/g6";
import {PsrAntvG6Types} from "../../types";

const defaultGraphCfg: () => PsrAntvG6Types.GraphOptions = () => ({
    // 自动更新画布大小
    fitView: true,
    fitViewPadding: 50,
    // 渲染模式
    renderer: 'svg',
    layout: {
        // 层级布局
        type: "dagre",
        // 布局方向
        rankdir: "LR",
        // 同层元素间距
        nodesep: 20,
        // 层间距
        ranksep: 80,
        // 使用web-work防止阻塞(启用后绘制异常带排查) TODO
        workerEnabled: false,
        // 同层元素根据comboId排序
        sortByCombo: false
    },
    modes: {
        default: [
            // 可拖拽画布
            'drag-canvas',
            // 可缩放画布
            'zoom-canvas',
            // 激活关联的节点和边
            'activate-relations'
        ],
    }
})

const defaultMinimapCfg: () => PsrAntvG6Types.MiniMapConfig = () => ({
    size: [200, 120],
    type: 'delegate',
    hideEdge: false,
})

export function useGraph(options?: {
    graphCfg?: PsrAntvG6Types.GraphOptions,
    minimapCfg?: PsrAntvG6Types.MiniMapConfig | false
}) {
    const ctGraphRef = ref<HTMLDivElement>()
    const ctMiniMapRef = ref<HTMLDivElement>()
    const graph = shallowRef<Graph>()
    onMounted(() => {
        const minimap = new Minimap({
            container: ctMiniMapRef.value!,
            ...defaultMinimapCfg(),
            ...options?.minimapCfg
        });
        const plugins: any[] = []
        if (options?.graphCfg?.plugins) {
            plugins.push(...options?.graphCfg?.plugins)
        }
        if (options?.minimapCfg !== false) {
            plugins.push(minimap)
        }
        graph.value = new Graph({
            container: ctGraphRef.value!,
            ...defaultGraphCfg(),
            ...options?.graphCfg,
            plugins
        })
    })
    return {
        ctGraphRef, ctMiniMapRef, graph
    }
}