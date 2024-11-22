import {App, getCurrentInstance, inject, ShallowRef} from "vue";
import {ElementHooks, ExtensionCategory, Graph, GraphOptions, register} from '@antv/g6';
import type {Loosen} from "@antv/g6/lib/types";
import type {ExtensionRegistry} from "@antv/g6/lib/registry/types";
import {useGraph} from "../services/graph/useGraph";
import {BreathingAnimation, registerVueNode, RippleAnimation, VueNode} from "../services/nodes";
import {AntLineAnimation, FlyMarkerAnimation} from "../services/edges";
import {registerElementWithHooks} from "../services/utils/useShapeWithExtensions";

const injectKey = 'psr-antv-g6'

export class PsrAntvG6 {
    private static _activeInstance: PsrAntvG6
    private nextElementId: number = 0
    static readonly Nodes = {
        Shapes: {
            VueNode,
        },
        Types: {
            VueNode: registerVueNode()
        },
        Animations: {
            BreathingAnimation,
            RippleAnimation
        }
    }
    static readonly Edges = {
        Animations: {
            AntLine: AntLineAnimation,
            FlyMarker: FlyMarkerAnimation
        }
    }

    static registerElement<T extends ExtensionCategory>(
        category: Loosen<T>,
        Ctor: ExtensionRegistry[T][string],
    ) {
        const type = 'psr-element-' + this.getInstance().nextElementId++
        register(category, type, Ctor)
        return type
    }

    static registerElementWithHooks<T extends ExtensionCategory.NODE | ExtensionCategory.EDGE | ExtensionCategory.COMBO>(
        category: Loosen<T>,
        Ctor: ExtensionRegistry[T][string],
        elHooks: () => ElementHooks[]
    ) {
        const type = 'psr-element-' + this.getInstance().nextElementId++
        registerElementWithHooks(category, type, Ctor, elHooks)
        return type
    }

    static useGraph(
        containerDivRef: ShallowRef<HTMLDivElement | undefined>,
        options?: {
            graph?: GraphOptions
        }) {
        return useGraph(containerDivRef, options)
    }

    static setElementState(graph: Graph, element: string, stateKey: string, enabled: boolean) {
        const state = graph.getElementState(element)
        if (!enabled) {
            graph.setElementState(element, state.filter(s => s != stateKey))
        } else {
            const stateIndex = state.indexOf(stateKey)
            if (stateIndex < 0) {
                graph.setElementState(element, [...state, stateKey])
            }
        }
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