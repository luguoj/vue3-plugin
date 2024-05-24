import {Ref, ShallowRef} from "vue";
import {useAMapViewControlService} from "./useAMapViewControlService.ts";

export function useAMapZoomService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapMoveImmediately: boolean,
        mapMoveDuration?: number
    }>,
    valueModel: Ref<number | undefined>,
    transitionFlagModel: Ref<boolean>
) {
    useAMapViewControlService({
        mapRef,
        valueModel,
        transitionFlagModel,
        applyValueFn: (map, newValue, immediately) => {
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