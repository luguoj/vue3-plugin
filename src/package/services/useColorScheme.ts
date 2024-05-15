import {getCurrentInstance, onMounted, onUnmounted, ref, Ref} from "vue";
import {ComponentInternalInstance} from "@vue/runtime-core";

export function usePsrColorScheme(elRef?: Ref<Element>): Ref<string> {
    let updateInt: NodeJS.Timeout | undefined
    const vm = getCurrentInstance()
    const colorSchemeRef: Ref<string> = ref('')
    onMounted(() => {
        const vmRoot = getVmRoot(vm)
        colorSchemeRef.value = getColorScheme(elRef?.value || vmRoot)
        updateInt = setInterval(() => {
            colorSchemeRef.value = getColorScheme(elRef?.value || vmRoot)
        }, 200)
    })
    onUnmounted(() => {
        clearInterval(updateInt)
    })
    return colorSchemeRef
}

function getVmRoot(vm: ComponentInternalInstance | null): Element | undefined {
    const el = vm?.proxy?.$el
    if (el instanceof Element) {
        return el
    }
}

function getColorScheme(el: Element = document.body): string {
    return getComputedStyle(el).getPropertyValue('color-scheme')
}