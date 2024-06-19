import {App, ComponentOptionsBase, defineCustomElement, getCurrentInstance, inject, onMounted, ShallowRef} from "vue";
import * as G6 from "@antv/g6";
import {PsrAntvG6Types} from "../types";
import {useGraph} from "../services/graph/useGraph.ts";
import {useShape, useShapeWithExtensions} from "../services/utils/useShapeWithExtensions.ts";
import {ShapeExtensionHandlerBuilder} from "../services/utils/ShapeExtensionHandler.ts";
import {ArrowRunningBuilder} from "../services/edges/ani-handlers/ArrowRunningHandler.ts";
import {CircleRunningBuilder} from "../services/edges/ani-handlers/CircleRunningHandler.ts";
import {LineDashBuilder} from "../services/edges/ani-handlers/LineDashHandler.ts";
import {LineGrowthBuilder} from "../services/edges/ani-handlers/LineGrowthHandler.ts";
import {CircleScaleBuilder} from "../services/nodes/ani-handlers/CircleScaleHandler.ts";
import {CircleShadowBuilder} from "../services/nodes/ani-handlers/CircleShadowHandler.ts";
import {ElOverlayBuilder} from "../services/nodes/ElOverlayHandler.ts";
import {SvgOverlayBuilder} from "../services/nodes/SvgOverlayHandler.ts";

const injectKey = 'psr-antv-g6'
const edgeExtBuilderRaws: ShapeExtensionHandlerBuilder<any>[] = [
    ArrowRunningBuilder, CircleRunningBuilder, LineDashBuilder, LineGrowthBuilder, // 边动画
]
const edgeExtBuilders: Record<string, ShapeExtensionHandlerBuilder<any>> = {}
for (const builderRaw of edgeExtBuilderRaws) {
    edgeExtBuilders[builderRaw.type()] = builderRaw
}
const nodeExtBuilderRaws: ShapeExtensionHandlerBuilder<any>[] = [
    CircleScaleBuilder, CircleShadowBuilder, // 节点动画
    ElOverlayBuilder, SvgOverlayBuilder, // 节点覆盖层
]
const nodeExtBuilders: Record<string, ShapeExtensionHandlerBuilder<any>> = {}
for (const builderRaw of nodeExtBuilderRaws) {
    nodeExtBuilders[builderRaw.type()] = builderRaw
}

export class PsrAntvG6 {
    private static _activeInstance: PsrAntvG6
    private _g6: Promise<typeof G6> | undefined
    private nextShapeId: number = 0

    g6(): Promise<any> {
        if (!this._g6) {
            this._g6 = new Promise((resolve) => {
                // 必须要在onMounted 中调用，否则会导致SSR构建时抛出异常
                onMounted(() => {
                    import("@antv/g6").then((G6) => {
                        resolve(G6)
                    })
                })
            })
        }
        return this._g6
    }

    static useNode(
        definition: (extendShape?: any) => G6.ShapeOptions | G6.ShapeDefine,
        extendShapeType?: string
    ) {
        return useShape(
            PsrAntvG6.getInstance().g6(),
            this.getInstance().nextShapeId++,
            'node',
            definition,
            extendShapeType
        )
    }


    static useEdge(
        definition: (extendShape?: any) => G6.ShapeOptions,
        extendShapeType?: string
    ) {
        return useShape(
            PsrAntvG6.getInstance().g6(),
            this.getInstance().nextShapeId++,
            'edge',
            definition,
            extendShapeType
        )
    }


    static useNodeWithExtensions(options: {
        extendShape?: PsrAntvG6Types.NodeType | string
        extensions: {
            type: PsrAntvG6Types.NodeExtensionType,
            cfg?: any
        }[]
    }) {
        return useShapeWithExtensions(
            PsrAntvG6.getInstance().g6(),
            {
                id: this.getInstance().nextShapeId++,
                shapeType: 'node',
                extendShape: options.extendShape,
                extensions: options.extensions,
                builders: nodeExtBuilders
            }
        )
    }

    static useEdgeWithExtensions(options: {
        extendShape?: PsrAntvG6Types.EdgeType | string
        extensions: {
            type: PsrAntvG6Types.EdgeExtensionType,
            cfg?: any
        }[]
    }) {
        return useShapeWithExtensions(
            PsrAntvG6.getInstance().g6(),
            {
                id: this.getInstance().nextShapeId++,
                shapeType: 'edge',
                extendShape: options.extendShape,
                extensions: options.extensions,
                builders: edgeExtBuilders
            }
        )
    }

    static useElWithComponent(options: {
        component: ComponentOptionsBase<any, any, any, any, any, any, any, any>
    }) {
        const tag = `psr-antv-g6-el-${this.getInstance().nextShapeId++}`
        onMounted(() => {
            customElements.define(tag, defineCustomElement(options.component as any))
        })
        return tag
    }

    static useGraph(
        containerDivRef: ShallowRef<HTMLDivElement | undefined>,
        options?: {
            graphCfg?: PsrAntvG6Types.GraphOptions,
            minimapCfg?: PsrAntvG6Types.MiniMapConfig
        }) {
        return useGraph(PsrAntvG6.getInstance().g6(), containerDivRef, options)
    }

    private static getInstance(): PsrAntvG6 {
        if (getCurrentInstance())
            return inject<PsrAntvG6>(injectKey) || PsrAntvG6._activeInstance
        else return PsrAntvG6._activeInstance
    }

    static create() {
        return PsrAntvG6._activeInstance = new PsrAntvG6()
    }

    install(app: App) {
        app.provide(injectKey, this)
    }
}