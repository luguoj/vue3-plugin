import {onUnmounted, Ref, shallowRef, ShallowRef, watch} from "vue";
import {PsrAMapTypes} from "../types/PsrAMapTypes"

export function useMap(
    MapConstructor: typeof AMap.Map | Promise<typeof AMap.Map>,
    containerDivRef: ShallowRef<HTMLDivElement | undefined>,
    initOptionsRef: Ref<PsrAMapTypes.MapInitOptions>,
    options?: PsrAMapTypes.MapOptions | (() => PsrAMapTypes.MapOptions)
): ShallowRef<AMap.Map | undefined> {
    const map = shallowRef<AMap.Map>()

    function build(containerDiv: HTMLDivElement, initOptions: PsrAMapTypes.MapInitOptions) {
        const mapOptions: any =
            typeof options === 'function'
                ? {...options(), ...initOptions}
                : {...options, ...initOptions}
        if (MapConstructor instanceof Promise) {
            MapConstructor.then(Map => {
                map.value = new Map(containerDiv, mapOptions)
            })
        } else {
            map.value = new MapConstructor(containerDiv, mapOptions)
        }
    }

    // 销毁地图实例
    function dispose() {
        if (map.value) {
            map.value.destroy()
        }
    }

    // 组件装载时，创建容器监听器，选项监听器，创建地图实例
    watch(containerDivRef, (containerDiv, old) => {
        if (old != containerDiv) {
            dispose()
        }
        if (containerDiv) {
            build(containerDiv, initOptionsRef.value)
        }
    }, {immediate: true})
    watch(initOptionsRef, options => {
        // 如果视图模式变更，需要重新初始化地图实例
        if (containerDivRef.value) {
            dispose()
            build(containerDivRef.value, options)
        }
    }, {deep: true, immediate: true})

    // 组件卸载时取消监听器，并销毁地图实例
    onUnmounted(() => {
        dispose()
    })
    return map
}