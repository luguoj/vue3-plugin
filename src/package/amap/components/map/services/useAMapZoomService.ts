import {Ref, ShallowRef, watch} from "vue";

export function useAMapZoomService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapMoveImmediately: boolean,
        mapMoveDuration?: number
    }>,
    valueModel: Ref<number | undefined>
) {
    // 目标值
    let targetValue: number | undefined = undefined
    watch(valueModel, (newValue) => {
        if (newValue) { // 如果新值有效，则应用新值
            apply(newValue)
        } else { // 如果新值无效，则使用地图参数更新值模型
            updateModel()
        }
    }, {immediate: true})

    // 应用新值
    function apply(newValue: number, immediately = false) {
        const map = mapRef.value as any
        if (!targetValue && map) { // 如果不在变换过程中，则应用新值
            targetValue = newValue
            map.setZoom(newValue, props.mapMoveImmediately || immediately, props.mapMoveDuration)
        }
    }

    // 更新模型
    function updateModel() {
        if (mapRef.value) {
            valueModel.value = mapRef.value.getZoom()
        }
    }

    // 监听地图初始化
    watch(mapRef, map => {
        if (valueModel.value) { // 如果模型有初始值，则应用初始值
            apply(valueModel.value, true)
        } else { // 如果新值无效，则使用地图默认参数更新值模型
            updateModel()
        }
        // 监听地图缩放事件，更新模型
        map && map.on('zoomchange', () => {
            updateModel()
        })
        // 监听地图缩放结束事件，重置目标值
        map && map.on('zoomend', () => {
            targetValue = undefined
        })
    }, {immediate: true})
}