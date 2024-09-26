import {ref, Ref, UnwrapRef, watch} from "vue";
import {PsrLogger} from "@package/messenger";

/**
 * 根据 响应式JSON引用，创建响应式对象引用，实现JSON值和对象的双向同步
 * @param jsonRef JSON引用
 */
export function useJsonObjectRef<T>(jsonRef: Ref<string | null | undefined>): Ref<UnwrapRef<T> | null> {
    // 日志器
    const logger = PsrLogger.useLog()
    const objectRef = ref<T | null>(null)
    watch(jsonRef, newJsonValue => {
        if (!newJsonValue) {
            objectRef.value = null
            return
        }
        if (JSON.stringify(objectRef.value) != newJsonValue) {
            try {
                objectRef.value = JSON.parse(newJsonValue)
            } catch (err) {
                logger.error("JSON解析失败", {data: err, log: true, feedback: true})
            }
        }
    }, {immediate: true})
    watch(objectRef, newObjectValue => {
        let newJsonValue
        if (!newObjectValue) {
            newJsonValue = null
        } else {
            newJsonValue = JSON.stringify(newObjectValue)
        }
        if (jsonRef.value != newJsonValue) {
            jsonRef.value = newJsonValue
        }
    }, {deep: true})

    return objectRef
}