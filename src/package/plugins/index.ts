import {App, ComponentOptions, getCurrentInstance, inject} from "vue";
import {useGraph} from "../antv-g6/graph/useGraph.ts";
import {PsrAntvG6Types} from "../types";
import {useVueNode} from "../antv-g6/nodes/useVueNode.ts";
import {ShapeExtensionHandlerBuilder} from "../antv-g6/utils/ShapeExtensionHandler.ts";
import {useShapeWithExtensions} from "../antv-g6/utils/useShapeWithExtensions.ts";
import {ArrowRunningBuilder} from "../antv-g6/edges/ani-handlers/ArrowRunningHandler.ts";
import {CircleRunningBuilder} from "../antv-g6/edges/ani-handlers/CircleRunningHandler.ts";
import {LineDashBuilder} from "../antv-g6/edges/ani-handlers/LineDashHandler.ts";
import {LineGrowthBuilder} from "../antv-g6/edges/ani-handlers/LineGrowthHandler.ts";
import {CircleScaleBuilder} from "../antv-g6/nodes/ani-handlers/CircleScaleHandler.ts";
import {CircleShadowBuilder} from "../antv-g6/nodes/ani-handlers/CircleShadowHandler.ts";

const injectKey = 'psr-antv-g6'
const builderRaws: ShapeExtensionHandlerBuilder<any>[] = [
    ArrowRunningBuilder, CircleRunningBuilder, LineDashBuilder, LineGrowthBuilder, CircleScaleBuilder, CircleShadowBuilder
]
const builders: Record<string, ShapeExtensionHandlerBuilder<any>> = {}
for (const builderRaw of builderRaws) {
    builders[builderRaw.type()] = builderRaw
}

export class PsrAntvG6 {
    private static _activeInstance: PsrAntvG6
    private nextShapeId: number = 0

    static useNodeWithExtensions(options: {
        extendShape?: any
        extensions: {
            type: any,
            cfg?: any
        }[]
    }) {
        return useShapeWithExtensions({
            id: this.getInstance().nextShapeId++,
            shapeType: 'node',
            extendShape: options.extendShape,
            extensions: options.extensions,
            builders
        })
    }

    static useEdgeWithExtensions(options: {
        extendShape?: any
        extensions: {
            type: any,
            cfg?: any
        }[]
    }) {
        return useShapeWithExtensions({
            id: this.getInstance().nextShapeId++,
            shapeType: 'edge',
            extendShape: options.extendShape,
            extensions: options.extensions,
            builders
        })
    }

    static useVueNode(options: { component: ComponentOptions }) {
        return useVueNode({
            id: this.getInstance().nextShapeId++,
            component: options.component
        })
    }

    static useGraph(options?: {
        graphCfg?: PsrAntvG6Types.GraphOptions,
        minimapCfg?: PsrAntvG6Types.MiniMapConfig | false
    }) {
        return useGraph(options)
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