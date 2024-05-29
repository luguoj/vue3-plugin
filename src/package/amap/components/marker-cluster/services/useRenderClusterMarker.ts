import {computed, ComputedRef, markRaw, reactive, ref} from "vue";
import {PsrAMapTypes} from "../../../types/PsrAMapTypes.ts";

export type RenderClusterMarkerData<T> = {
    // 渲染聚合点标记实例对象
    marker: any
    // 渲染点标记AMapID
    amapId: string
    // 渲染聚合点标记DOM
    dom: HTMLElement
    // 聚合的点标记数量
    count: number
    // 聚合的点标记选项
    clusterOptions: PsrAMapTypes.ClusterMarkerData<T>[]
}

export function useRenderClusterMarker<T>(): {
    renderClusterMarkerDataRef: ComputedRef<RenderClusterMarkerData<T>[]>
    renderClusterMarker: (rawRenderClusterMarkerData: AMap.MarkerCluster.RenderClusterMarkerData) => void
} {
    // 渲染聚合点标记数据
    const allRenderClusterMarkerDataRef = ref<RenderClusterMarkerData<T>[]>([])
    // 渲染聚合点标记数据ID索引
    const allRenderClusterMarkerDataById: Record<string, RenderClusterMarkerData<T>> = {}
    // 有效的渲染聚合点标记数据
    const renderClusterMarkerDataRef = computed<RenderClusterMarkerData<T>[]>(() =>
        allRenderClusterMarkerDataRef.value.filter(item => item.marker.getMap()) as RenderClusterMarkerData<T>[]
    )

    // 聚合点标记渲染函数
    function renderClusterMarker(rawRenderClusterMarkerData: AMap.MarkerCluster.RenderClusterMarkerData) {
        // 覆盖默认的渲染内容
        rawRenderClusterMarkerData.marker.setContent("<div style='width: 0;height: 0;'/>")
        // 获取聚合点标记实例对象
        const marker = markRaw(rawRenderClusterMarkerData.marker as any)
        // 获取聚合点标记AMapID
        const amapId = marker._amap_id + ''
        // 获取聚合点标记容器DOM
        const dom = markRaw(marker.dom.children[0])
        const count = rawRenderClusterMarkerData.count
        // 获取原始选项数据
        const clusterOptions = rawRenderClusterMarkerData.clusterData.map(datum => datum.rawOptions)
        if (!allRenderClusterMarkerDataById[amapId]) {
            // 添加新的聚合点标记数据引用
            const newData = reactive({
                marker: marker,
                amapId: amapId,
                dom,
                count,
                clusterOptions
            })
            allRenderClusterMarkerDataById[amapId] = newData
            allRenderClusterMarkerDataRef.value.push(newData)
        } else {
            // 更新聚合点标记容器DOM
            allRenderClusterMarkerDataById[amapId].dom = markRaw(dom)
        }
    }

    return {
        renderClusterMarker,
        renderClusterMarkerDataRef
    }
}