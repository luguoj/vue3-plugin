import {ShallowRef, watch} from "vue";

export function useAMapFeaturesService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapFeatures: AMap.Map.Feature[]
    }>
) {
    // 应用新值
    function apply(newValue: AMap.Map.Feature[]) {
        const map = mapRef.value
        if (map) {
            map.setFeatures(newValue)
        }
    }

    // 监听值更新
    watch(() => props.mapFeatures, newValue => {
        apply(newValue)
    }, {immediate: true, deep: true})

    // 监听地图初始化
    watch(mapRef, () => {
        apply(props.mapFeatures)
    }, {immediate: true})
}