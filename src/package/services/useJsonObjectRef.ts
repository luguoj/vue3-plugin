import {ref, Ref, UnwrapRef, watch} from "vue";
import {PsrLogger} from "@package/messenger";

/**
 * 根据 响应式JSON引用，创建响应式对象引用，实现JSON值和对象的双向同步
 * @param jsonRef JSON引用
 * @param defaultValue 默认值
 * @param options 配置项
 */
export function useJsonObjectRef<T>(
    jsonRef: Ref<string | null | undefined>,
    defaultValue: () => T,
    options?: {
        jsonParseFail?: (json: string) => void
    }
): Ref<UnwrapRef<T>> {
    // 日志器
    const logger = PsrLogger.useLog()
    // 对象引用
    const objectRef: Ref<UnwrapRef<T>> = ref<T>(defaultValue())
    // 监听JSON引用的变化
    watch(jsonRef, newJsonValue => {
        // 如果为空，则重置为默认值
        if (!newJsonValue) {
            objectRef.value = defaultValue() as UnwrapRef<T>
            return
        }
        // 如果JSON值与对象引用不相等，则更新对象引用
        if (JSON.stringify(objectRef.value) != newJsonValue) {
            try {
                objectRef.value = JSON.parse(newJsonValue)
            } catch (err) {
                // 捕获JSON解析错误
                logger.error("JSON解析失败", {data: err, log: true, feedback: true})
                if (options?.jsonParseFail) {
                    options.jsonParseFail(newJsonValue)
                }
            }
        }
    }, {immediate: true})
    // 监听对象引用的变化
    watch(objectRef, newObjectValue => {
        // 如果JSON值与对象引用不相等，则更新JSON引用
        let newJsonValue = JSON.stringify(newObjectValue)
        if (jsonRef.value != newJsonValue) {
            jsonRef.value = newJsonValue
        }
    }, {deep: true, immediate: true})
    return objectRef
}