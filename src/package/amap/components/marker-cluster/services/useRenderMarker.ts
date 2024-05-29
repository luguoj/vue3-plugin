import {computed, ComputedRef, markRaw, reactive, ref} from "vue";
import {PsrAMapTypes} from "../../../types/PsrAMapTypes.ts";

// 渲染点标记数据
export interface RenderMarkerData<T> extends PsrAMapTypes.ClusterMarkerData<T> {
    // 渲染点标记实例对象
    marker: any
    // 渲染点标记AMapID
    amapId: string
    // 渲染点标记DOM
    dom: HTMLElement
}

export function useRenderMarker<T>(): {
    renderMarkerDataRef: ComputedRef<RenderMarkerData<T>[]>
    renderMarker: (rawRenderMarkerData: AMap.MarkerCluster.RenderMarkerData) => void
} {
    // 渲染聚合点标记数据
    const allRenderMarkerDataRef = ref<RenderMarkerData<T>[]>([])
    // 渲染聚合点标记数据ID索引
    const allRenderMarkerDataById: Record<string, RenderMarkerData<T>> = {}
    // 有效的渲染聚合点标记数据
    const renderMarkerDataRef = computed<RenderMarkerData<T>[]>(() => {
        return allRenderMarkerDataRef.value.filter(item => item.marker.getMap()) as RenderMarkerData<T>[]
    })

    // 点标记渲染函数
    function renderMarker(rawRenderMarkerData: AMap.MarkerCluster.RenderMarkerData) {
        // 覆盖默认的渲染内容
        rawRenderMarkerData.marker.setContent("<div style='width: 0;height: 0;'/>")
        // 获取点标记实例对象
        const marker = markRaw(rawRenderMarkerData.marker as any)
        // 获取点标记AMapID
        const amapId = marker._amap_id + ''
        // 获取点标记容器DOM
        const dom = markRaw(marker.dom.children[0])
        // 获取原始选项数据
        const {position, weight, data} = rawRenderMarkerData.data[0].rawOptions
        if (!allRenderMarkerDataById[amapId]) {
            // 添加新的聚合点标记数据引用
            const newData = reactive({
                marker,
                amapId,
                dom,
                position,
                weight,
                data
            })
            allRenderMarkerDataById[amapId] = newData
            allRenderMarkerDataRef.value.push(newData)
        } else {
            // 更新点标记容器DOM
            allRenderMarkerDataById[amapId].dom = markRaw(dom)
        }
    }

    return {
        renderMarker,
        renderMarkerDataRef
    }
}