import {getCurrentInstance, onMounted, onUnmounted, ref, Ref} from "vue";

export function usePsrColorScheme(): Ref<string> {
    let updateInt: NodeJS.Timeout | undefined
    const vm = getCurrentInstance()
    const colorSchemeRef: Ref<string> = ref('')
    onMounted(() => {
        updateInt = setInterval(() => {
            if (vm?.proxy?.$el) {
                colorSchemeRef.value = getComputedStyle(vm?.proxy?.$el).getPropertyValue('color-scheme')
            }
        }, 500)
    })
    onUnmounted(() => {
        clearInterval(updateInt)
    })
    return colorSchemeRef
}