import {App, getCurrentInstance, inject, ShallowRef} from "vue";
import {ExtensionCategory, Graph, GraphOptions, register} from '@antv/g6';
import type {Loosen} from "@antv/g6/lib/types";
import type {ExtensionRegistry} from "@antv/g6/lib/registry/types";
import {useGraph} from "../services/graph/useGraph";
import {
    useAntLineAnimation,
    useBreathingAnimation,
    useFlyMarkerAnimation,
    usePathInAnimation,
    useRippleAnimation
} from "../services/hooks";
import {registerVueNode, VueNode} from "../services/nodes"
import {ElementHooksBuilder, wrapElementCtorWithHooks} from "../services/wrapElementCtorWithHooks";

const injectKey = 'psr-antv-g6'

export class PsrAntvG6 {
    private static _activeInstance: PsrAntvG6
    private nextElementId: number = 0
    static readonly ElementHooksBuilders = {
        Edge: {
            useAntLineAnimation,
            useFlyMarkerAnimation,
            usePathInAnimation
        },
        Node: {
            useBreathingAnimation,
            useRippleAnimation
        }
    }
    static readonly Nodes = {
        Shapes: {
            VueNode,
        },
        Types: {
            VueNode: registerVueNode()
        }
    }

    static register<T extends ExtensionCategory>(
        category: Loosen<T>,
        Ctor: ExtensionRegistry[T][string]
    ) {
        const type = 'psr-ext-' + this.getInstance().nextElementId++
        register(category, type, Ctor)
        return type
    }

    static registerElement<T extends ExtensionCategory.NODE | ExtensionCategory.EDGE | ExtensionCategory.COMBO>(
        category: Loosen<T>,
        Ctor: ExtensionRegistry[T][string],
        options?: {
            elHooksBuilders?: ElementHooksBuilder[]
        }
    ) {
        if (options?.elHooksBuilders) {
            Ctor = wrapElementCtorWithHooks(Ctor, options.elHooksBuilders)
        }
        return this.register(category, Ctor)
    }

    static useGraph(
        containerDivRef: ShallowRef<HTMLDivElement | undefined>,
        options?: {
            graph?: GraphOptions
        }) {
        return useGraph(containerDivRef, options)
    }

    static setElementState(graph: Graph, statesByElement: Record<string, Record<string, boolean>>) {
        const elementStateToSet: Record<string, string[]> = {}
        Object.entries(statesByElement).forEach(([element, states]) => {
            let elementState = graph.getElementState(element)
            Object.entries(states).forEach(([stateKey, enabled]) => {
                if (!enabled) {
                    elementState = elementState.filter(s => s != stateKey)
                } else {
                    const stateIndex = elementState.indexOf(stateKey)
                    if (stateIndex < 0) {
                        elementState = [...elementState, stateKey]
                    }
                }
                elementStateToSet[element] = elementState
            })
        })
        return graph.setElementState(elementStateToSet)
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