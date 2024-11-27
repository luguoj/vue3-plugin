import {Ref, ShallowRef, shallowRef, toRaw, watch} from "vue";
import {Graph, GraphOptions} from "@antv/g6";
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
                container: toRaw(containerDivRef.value)
            })
            graphRef.value.render().then()
        }
    }, {immediate: true})
    return graphRef
}