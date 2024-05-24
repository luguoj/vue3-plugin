import {Ref, ShallowRef} from "vue";
import {useAMapViewControlService} from "./useAMapViewControlService.ts";

export function useAMapPitchService(
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
            if (newValue != map.getPitch()) {
                (map as any).setPitch(newValue, props.mapMoveImmediately || immediately, props.mapMoveDuration)
                return true
            }
            return false
        },
        getValueFn: map => map.getPitch(),
        changeEvent: "pitchchange",
        changeEndEvent: "pitchend",
    })
}