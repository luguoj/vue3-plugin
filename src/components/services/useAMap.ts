import AMapLoader from "@amap/amap-jsapi-loader";
import {ref, ShallowRef, shallowRef, watchEffect} from "vue";
import "../styles/hide-logo.scss"


export function useAMap(options: {
    key: string
    mode?: '2D' | '3D'
}): {
    container: ShallowRef<HTMLDivElement | undefined>
    map: ShallowRef<AMap.Map | undefined>
} {
    const loaded = ref<boolean>(false)
    const container = shallowRef<HTMLDivElement>()
    const map = shallowRef<AMap.Map>()
    AMapLoader.load({
        key: options.key,
        version: '2.0',
        plugins: []
    }).then(() => {
        loaded.value = true
    })
    watchEffect(() => {
        if (loaded.value && container.value) {
            map.value = new AMap.Map(container.value, {
                viewMode: options?.mode || '3D'
            })
        }
    })
    return {
        container,
        map
    }
}