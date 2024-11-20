import {Ref, ShallowRef, shallowRef, toRaw, watch} from "vue";
import {Graph, GraphOptions} from "@antv/g6";
import { Renderer as SVGRenderer } from '@antv/g-svg';
export function useGraph(
    containerDivRef: Ref<HTMLDivElement | undefined>,
    options?: {
        graph?: GraphOptions
    }) {
    const graphRef: ShallowRef<Graph | undefined> = shallowRef()
    watch(containerDivRef, containerDiv => {
        if (containerDiv) {
            graphRef.value = new Graph({
                ...options?.graph,
                container: toRaw(containerDivRef.value),
                renderer: () => new SVGRenderer()
            })
            graphRef.value.render().then()
        }
    }, {immediate: true})
    return graphRef
}