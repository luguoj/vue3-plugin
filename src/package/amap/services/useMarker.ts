import {onMounted, shallowRef} from "vue";
import {PsrAMapContext} from "../plugins";

export function useMarker(
    ctx: PsrAMapContext,
    initOptions?: AMap.Marker.Options | (() => AMap.Marker.Options)
) {
    const marker = shallowRef<AMap.Marker>()
    onMounted(() => {
        ctx.ready().then((AMap) => {
            marker.value = new AMap.Marker(initOptions)
        })
    })
    return marker
}