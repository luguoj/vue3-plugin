import {Ref, ShallowRef, watch} from "vue";

export function useAMapViewControlService<V>(options: {
    mapRef: ShallowRef<AMap.Map | undefined>,
    valueModel: Ref<V | undefined>,
    transitionFlagModel: Ref<boolean>,
    applyValueFn: (map: AMap.Map, newValue: V, immediately?: boolean) => boolean,
    getValueFn: (map: AMap.Map) => V,
    changeEvent: string,
    changeEndEvent: string
}) {
    const {
        mapRef,
        valueModel,
        transitionFlagModel,
        applyValueFn,
        getValueFn,
        changeEvent,
        changeEndEvent
    } = options
    // 目标值
    watch(valueModel, (newValue) => {
        if (newValue != undefined) { // 如果新值有效，则应用新值
            apply(newValue)
        } else { // 如果新值无效，则使用地图参数更新值模型
            updateModel()
        }
    }, {immediate: true})

    // 应用新值
    function apply(newValue: V, immediately = false) {
        const map = mapRef.value as any
        if (!transitionFlagModel.value && map) { // 如果不在变换过程中，则应用新值
            transitionFlagModel.value = applyValueFn(map, newValue, immediately)
        }
    }

    // 更新模型
    function updateModel() {
        if (mapRef.value) {
            valueModel.value = getValueFn(mapRef.value)
        }
    }

    // 监听地图初始化
    watch(mapRef, map => {
        if (valueModel.value != undefined) { // 如果模型有初始值，则应用初始值
            apply(valueModel.value, true)
        } else { // 如果新值无效，则使用地图默认参数更新值模型
            updateModel()
        }
        // 监听地图缩放事件，更新模型
        map && map.on(changeEvent, () => {
            console.log(changeEvent)
            updateModel()
        })
        // 监听地图缩放结束事件，重置目标值
        map && map.on(changeEndEvent, () => {
            console.log(changeEndEvent)
            transitionFlagModel.value = false
        })
    }, {immediate: true})
}