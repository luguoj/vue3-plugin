import {getCurrentInstance, onMounted, onUnmounted, ref, Ref} from "vue";

export function usePsrColorScheme(elRef?: Ref<Element>): Ref<string> {
    let updateInt: NodeJS.Timeout | undefined
    const vm = getCurrentInstance()
    const colorSchemeRef: Ref<string> = ref('')
    onMounted(() => {
        colorSchemeRef.value = getColorScheme(elRef?.value || vm?.proxy?.$el)
        updateInt = setInterval(() => {
            colorSchemeRef.value = getColorScheme(elRef?.value || vm?.proxy?.$el)
        }, 200)
    })
    onUnmounted(() => {
        clearInterval(updateInt)
    })
    return colorSchemeRef
}

function getColorScheme(el: Element = document.body): string {
    return getComputedStyle(el).getPropertyValue('color-scheme')
}