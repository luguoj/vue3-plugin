import {computed, ref} from "vue";
import {PsrAMapContext} from "../../../plugins";

export function useAMap(
    props: Readonly<{
        mapViewMode: "2D" | "3D",
    }>
) {
    // 初始化地图
    const containerRef = ref<HTMLDivElement>()
    const mapRef = PsrAMapContext.useMap(containerRef, computed(() => ({
        viewMode: props.mapViewMode
    })))
    return {containerRef, mapRef}
}