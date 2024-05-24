import {Ref, ShallowRef, watch} from "vue";
import {PsrAMapTypes} from "@psr-framework/vue3-plugin";

export function useAMapCenterService(
    mapRef: ShallowRef<AMap.Map | undefined>,
    props: Readonly<{
        mapMoveImmediately: boolean,
        mapMoveDuration?: number
    }>,
    centerModel: Ref<PsrAMapTypes.LngLat | undefined>
) {
    watch(centerModel, (center, oldValue) => {
        if (center && oldValue) {
            if (!movingTarget) {
                updateCenter(center)
            }
        }
    })
// 响应式移动目标
    let movingTarget: PsrAMapTypes.LngLat | undefined = undefined

// 更新地图中心点
    function updateCenter(center: PsrAMapTypes.LngLat, immediately = false) {
        movingTarget = {...center}
        if (centerModel.value && mapRef.value) {
            (mapRef.value as any).setCenter([centerModel.value.lng, centerModel.value.lat], props.mapMoveImmediately || immediately, props.mapMoveDuration)
        }
    }

// 发射中心点更新消息
    function emitCenter() {
        if (mapRef.value) {
            const {lng, lat} = mapRef.value.getCenter()
            centerModel.value = {lng, lat}
        }
    }

// 监听地图初始化
    watch(mapRef, map => {
        // 如果中心点有初始值，则移动到中心点，否则以地图默认中心点发射中心点更新消息
        if (centerModel.value) {
            updateCenter(centerModel.value, true)
        } else {
            emitCenter()
        }
        // 监听地图移动事件，更新中心点
        map && map.on('mapmove', () => {
            emitCenter()
        })
        // 监听地图移动结束事件，重置响应式移动目标
        map && map.on('moveend', () => {
            movingTarget = undefined
        })
    }, {immediate: true})
}