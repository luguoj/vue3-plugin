import {Ref, ShallowRef, watch} from "vue";
import {useAMapViewControlService} from "./useAMapViewControlService";

export function useAMapZoomService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapMoveImmediately: boolean,
        mapMoveDuration?: number,
        mapZoomRange: [number, number]
    }>,
    valueModel: Ref<number | undefined>,
    transitionFlagModel: Ref<boolean>
) {
    watch(() => props.mapZoomRange, mapZoomRange => {
        const min = Math.max(2, mapZoomRange[0])
        const max = Math.min(26, mapZoomRange[1])
        valueModel.value && (valueModel.value = Math.min(Math.max(valueModel.value, min), max))
    }, {immediate: true, deep: true})
    useAMapViewControlService({
        mapRef,
        valueModel,
        transitionFlagModel,
        applyValueFn: (map, newValue, immediately) => {
            const min = Math.max(2, props.mapZoomRange[0])
            const max = Math.min(26, props.mapZoomRange[1])
            newValue = Math.min(Math.max(newValue, min), max)
            valueModel.value = newValue
            if (newValue != map.getZoom()) {
                (map as any).setZoom(newValue, props.mapMoveImmediately || immediately, props.mapMoveDuration)
                return true
            }
            return false
        },
        getValueFn: map => map.getZoom(),
        changeEvent: "zoomchange",
        changeEndEvent: "zoomend",
    })
}