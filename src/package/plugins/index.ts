import {App, getCurrentInstance, inject} from "vue";
import {useEdgeWithAnimation, useGraph} from "../antv-g6";
import {PsrAntvG6Types} from "../types";

const injectKey = 'psr-antv-g6'

export class PsrAntvG6 {

    private static _activeInstance: PsrAntvG6
    private nextShapeId: number = 0

    static useEdgeWithAnimation(options: {
        edge: PsrAntvG6Types.EdgeType,
        animations: {
            type: PsrAntvG6Types.EdgeAnimationType,
            cfg?: any
        }[]
    }) {
        return useEdgeWithAnimation({
            id: this.getInstance().nextShapeId++,
            ...options
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

    install(app: App) {
        app.provide(injectKey, this)
    }
}