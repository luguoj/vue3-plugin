import {Directive} from "vue";

export const vPsrMutationObserver: Directive<HTMLElement & {
    _psrMutationObserver?: MutationObserver
}, (mutations: MutationRecord[]) => void> = {
    mounted(el, value) {
        const resizeObserver = new MutationObserver(mutations => {
            value.value(mutations)
        })
        el._psrMutationObserver = resizeObserver
        resizeObserver.observe(el)
    },
    unmounted(el) {
        el._psrMutationObserver?.disconnect()
    }
}