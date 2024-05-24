import {Ref, ShallowRef} from "vue";
import {PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {useAMapViewControlService} from "./useAMapViewControlService.ts";

export function useAMapCenterService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapMoveImmediately: boolean,
        mapMoveDuration?: number
    }>,
    valueModel: Ref<PsrAMapTypes.LngLat | undefined>,
    transitionFlagModel: Ref<boolean>
) {
    useAMapViewControlService({
        mapRef,
        valueModel,
        transitionFlagModel,
        applyValueFn: (map, newValue, immediately) => {
            if (newValue.lng != map.getCenter().getLng() || newValue.lat != map.getCenter().getLat()) {
                (map as any).setCenter([newValue.lng, newValue.lat], props.mapMoveImmediately || immediately, props.mapMoveDuration)
                return true
            }
            return false
        },
        getValueFn: map => {
            const {lng, lat} = map.getCenter()
            return {lng, lat}
        },
        changeEvent: "mapmove",
        changeEndEvent: "moveend",
    })
}