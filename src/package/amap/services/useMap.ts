import {onUnmounted, Ref, shallowRef, ShallowRef, watch, WatchStopHandle} from "vue";
import {PsrAMapContext} from "../plugins";
import {PsrAMapTypes} from "../types/PsrAMapTypes"

export function useMap(
    ctx: PsrAMapContext,
    containerDivRef: ShallowRef<HTMLDivElement | undefined>,
    optionsRef: Ref<PsrAMapTypes.MapOptions>,
    initOptions?: Omit<AMap.Map.Options, "viewMode"> | (() => Omit<AMap.Map.Options, "viewMode">)
): ShallowRef<AMap.Map | undefined> {
    const map = shallowRef<AMap.Map>()
    let viewMode: '2D' | '3D' = '2D'

    function build(AMap: any, containerDiv: HTMLDivElement, options: PsrAMapTypes.MapOptions) {
        viewMode = options?.viewMode || '2D'
        const mapOptions =
            typeof initOptions === 'function'
                ? {...initOptions(), ...options}
                : {...initOptions, ...options}
        map.value = new AMap.Map(containerDiv, mapOptions)
    }

    // 销毁地图实例
    function dispose() {
        if (map.value) {
            map.value.destroy()
        }
    }

    // 组件装载时，创建容器监听器，选项监听器，创建地图实例
    let containerWatcher: WatchStopHandle | undefined = undefined
    let optionsWatcher: WatchStopHandle | undefined = undefined

    function init(AMap: any) {
        containerWatcher = watch(containerDivRef, (containerDiv, old) => {
            if (old != containerDiv) {
                dispose()
            }
            if (containerDiv) {
                build(AMap, containerDiv, optionsRef.value)
            }
        }, {immediate: true})
        optionsWatcher = watch(optionsRef, options => {
            // 如果视图模式变更，需要重新初始化地图实例
            if (options?.viewMode && options.viewMode != viewMode && containerDivRef.value) {
                dispose()
                build(AMap, containerDivRef.value, options)
            }
        }, {deep: true, immediate: true})
    }

    ctx.ready().then((AMap) => {
        init(AMap)
    })
    // 组件卸载时取消监听器，并销毁地图实例
    onUnmounted(() => {
        containerWatcher && containerWatcher()
        optionsWatcher && optionsWatcher()
        dispose()
    })
    return map
}