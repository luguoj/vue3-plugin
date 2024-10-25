import {ref, Ref, UnwrapRef, watch} from "vue";
import {PsrLogger} from "@package/messenger";
import {IfAny} from "@vue/shared";

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
): [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T> {
    // 日志器
    const logger = PsrLogger.useLog()
    // 对象引用
    const objectRef: [T] extends [Ref] ? IfAny<T, Ref<T>, T> : Ref<UnwrapRef<T>, UnwrapRef<T> | T> = ref<T>(defaultValue())
    // 监听JSON引用的变化
    watch(jsonRef, newJsonValue => {
        const defaultObject = defaultValue()
        // 如果为空，则重置为默认值
        if (!newJsonValue) {
            objectRef.value = defaultObject as UnwrapRef<T>
            return
        }
        // 如果JSON值与对象引用不相等，则更新对象引用
        if (JSON.stringify(objectRef.value) != newJsonValue) {
            try {
                const newObject = JSON.parse(newJsonValue)
                // 判断对象类型是否一致
                if ((defaultObject instanceof Array) != (newObject instanceof Array)) {
                    throw new Error(`JSON对象类型不匹配`)
                }
                objectRef.value = newObject
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