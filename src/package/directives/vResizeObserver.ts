import {Directive} from "vue";

export const vPsrResizeObserver: Directive<HTMLElement & {
    _psrResizeObserver?: ResizeObserver
}, (entry: ResizeObserverEntry) => void> = {
    mounted(el, value) {
        const resizeObserver = new ResizeObserver(entries => {
            value.value(entries[0])
        })
        el._psrResizeObserver = resizeObserver;
        resizeObserver.observe(el)
    },
    unmounted(el) {
        el._psrResizeObserver?.disconnect()
    }
}