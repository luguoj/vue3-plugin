import {Ref, ShallowRef} from "vue";
import {useAMapViewControlService} from "./useAMapViewControlService";

export function useAMapRotationService(
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
            if (newValue != map.getRotation()) {
                (map as any).setRotation(newValue, props.mapMoveImmediately || immediately, props.mapMoveDuration)
                return true
            }
            return false
        },
        getValueFn: map => map.getRotation(),
        changeEvent: "rotatechange",
        changeEndEvent: "rotateend",
    })
}