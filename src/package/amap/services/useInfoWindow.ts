import {onMounted, shallowRef} from "vue";
import {PsrAMapContext} from "../plugins";

export function useInfoWindow(
    ctx: PsrAMapContext,
    initOptions?: AMap.InfoWindow.Options | (() => AMap.InfoWindow.Options)
) {
    const infoWindow = shallowRef<AMap.InfoWindow>()
    onMounted(() => {
        ctx.ready().then((AMap) => {
            infoWindow.value = new AMap.InfoWindow(initOptions)
        })
    })
    return infoWindow
}